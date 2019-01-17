---
title: "Elixir and Circle CI 2.0"
tags: ["elixir"]
date: 2017-09-27
excerpt: |

---




```bash
#!/bin/bash

# Usage:
# ./check-tool-versions
# will check erlang, elixir, and nodejs versions
#
# ./check-tool-versions nodejs elixir
# will only check nodejs and elixir

LANGUAGES="erlang elixir nodejs"

get_tool_version() {
  grep "$1" .tool-versions | awk '{print $2}'
}

has_matching_versions() {
  # Usage: has_matching_versions DEPTH VERSION1 VERSION2
  # Usage: has_matching_versions major v1.2.3 v1.2.5   #=> 0 (yes)
  # Usage: has_matching_versions minor v1.2.3 v1.2.5   #=> 0 (yes)
  # Usage: has_matching_versions patch v1.2.3 v1.2.5   #=> 1 (no)
  # Usage: has_matching_versions patch v1.3.0 v1.2.0   #=> 1 (no)
  # Usage: has_matching_versions patch v2.0.0 v1.0.0   #=> 1 (no)

  local CHECK_DEPTH="$1"; shift
  local CURRENT_VERSION="$1"; shift
  local NEEDED_VERSION="$1"; shift
  local CURRENT_MAJOR
  local CURRENT_MINOR
  local CURRENT_PATCH
  local NEEDED_MAJOR
  local NEEDED_MINOR
  local NEEDED_PATCH

  CURRENT_MAJOR=$(echo "${CURRENT_VERSION#v}" | cut -d. -f1)
  CURRENT_MINOR=$(echo "$CURRENT_VERSION" | cut -d. -f2)
  CURRENT_PATCH=$(echo "$CURRENT_VERSION" | cut -d. -f3)

  NEEDED_MAJOR=$(echo "${NEEDED_VERSION#v}" | cut -d. -f1)
  NEEDED_MINOR=$(echo "$NEEDED_VERSION" | cut -d. -f2)
  NEEDED_PATCH=$(echo "$NEEDED_VERSION" | cut -d. -f3)

  local RETURN
  if [ "$CURRENT_MAJOR" = "$NEEDED_MAJOR" ]; then RETURN=0; else RETURN=1; fi
  if [ "$RETURN" = 1 ]; then return 1; fi
  if [ "$CHECK_DEPTH" = "minor" ]; then
    if [ "$CURRENT_MINOR" = "$NEEDED_MINOR" ]; then RETURN=0; else RETURN=1; fi
  fi
  if [ "$RETURN" = 1 ]; then return 1; fi
  if [ "$CHECK_DEPTH" = "patch" ]; then
    if [ "$CURRENT_PATCH" = "$NEEDED_PATCH" ]; then RETURN=0; else RETURN=1; fi
  fi
  return $RETURN
}

should_check_language () {
  if [[ "$LANGUAGES_TO_CHECK" = *$1* ]]; then return 0; else return 1; fi
}

# Default to all languages if no languages specified
if [ "$#" -eq 0 ]; then
  LANGUAGES_TO_CHECK=$LANGUAGES
else
  LANGUAGES_TO_CHECK=$*
fi

# Erlang
if should_check_language "erlang"; then
  if command -v erl >/dev/null; then
    NEEDED_ERLANG_VERSION="$(get_tool_version "erlang")"
    CURRENT_ERLANG_VERSION=$(
      erl -eval '{ok, Version} = file:read_file(filename:join([code:root_dir(), "releases", erlang:system_info(otp_release), "OTP_VERSION"])), io:fwrite(Version), halt().' -noshell
    )
    if has_matching_versions major "$CURRENT_ERLANG_VERSION" "$NEEDED_ERLANG_VERSION"; then
      echo "Erlang/OTP major versions match"
      echo "Requested: $NEEDED_ERLANG_VERSION. Available: $CURRENT_ERLANG_VERSION"
    else
      echo "The Erlang version does not match"
      echo "Requested: $NEEDED_ERLANG_VERSION. Available: $CURRENT_ERLANG_VERSION"
      exit 1
    fi
  else
    echo "Erlang is not installed"
    exit 1
  fi
fi

# Elixir
if should_check_language "elixir"; then
  if command -v elixir >/dev/null; then
    NEEDED_ELIXIR_VERSION="$(get_tool_version "elixir" | sed 's/-otp.*//')"
    NEEDED_ELIXIR_OTP_VERSION="$(get_tool_version "elixir" | cut -d- -f3)"
    CURRENT_ELIXIR_VERSION="$(elixir --version | tail -n 1 | awk '{print $2}')"
    CURRENT_ELIXIR_OTP_VERSION="$(elixir --version | tail -n 1 | awk '{print $6}' | grep -o '[0-9]*')"
    if has_matching_versions patch "$CURRENT_ELIXIR_VERSION" "$NEEDED_ELIXIR_VERSION"; then
      echo "Elixir versions match"
      echo "Requested: $NEEDED_ELIXIR_VERSION. Available: $CURRENT_ELIXIR_VERSION"
    else
      echo "The Elixir version does not match"
      echo "Requested: $NEEDED_ELIXIR_VERSION. Available: $CURRENT_ELIXIR_VERSION"
      exit 1
    fi

    if has_matching_versions major "$CURRENT_ELIXIR_OTP_VERSION" "$NEEDED_ELIXIR_OTP_VERSION"; then
      echo "Elixir OTP versions match"
      echo "Requested: $NEEDED_ELIXIR_OTP_VERSION. Available: $CURRENT_ELIXIR_OTP_VERSION"
    else
      echo "The Elixir OTP version does not match"
      echo "Requested: $NEEDED_ELIXIR_OTP_VERSION. Available: $CURRENT_ELIXIR_OTP_VERSION"
      exit 1
    fi
  else
    echo "Elixir is not installed"
    exit 1
  fi
fi

# NodeJS
if should_check_language "nodejs"; then
  if command -v node >/dev/null; then
    NEEDED_NODEJS_VERSION="$(get_tool_version "nodejs")"
    CURRENT_NODEJS_VERSION="$(node --version)"
    if has_matching_versions major "$CURRENT_NODEJS_VERSION" "$NEEDED_NODEJS_VERSION"; then
      echo "NodeJS major versions match"
      echo "Requested: $NEEDED_NODEJS_VERSION. Available: $CURRENT_NODEJS_VERSION"
    else
      echo "The NodeJS version does not match"
      echo "Requested: $NEEDED_NODEJS_VERSION. Available: $CURRENT_NODEJS_VERSION"
      exit 1
    fi
  else
    echo "NodeJS is not installed"
    exit 1
  fi
fi
```


```yaml
# Elixir CircleCI 2.0 configuration file
#
# Check https://circleci.com/docs/2.0/language-elixir/ for more details
#
version: 2

attach_workspace: &attach_workspace
  attach_workspace:
    at: ~/repo

elixir_defaults: &elixir_defaults
  working_directory: ~/repo
  docker:
    - image: circleci/elixir:1.7.3-node-browsers
      environment:
        HEX_HOME: /home/circleci/repo/.cache/hex
        MIX_HOME: /home/circleci/repo/.cache/mix
        POSTGRES_USER: root
        YARN_CACHE_FOLDER: /home/circleci/repo/.cache/yarn
    - image: circleci/postgres:10.4-alpine-ram
      environment:
        POSTGRES_DB: optify_test
        POSTGRES_USER: root

node_defaults: &node_defaults
  working_directory: ~/repo
  docker:
    - image: circleci/node:8.11.4
      environment:
        YARN_CACHE_FOLDER: /home/circleci/repo/.cache/yarn

jobs:
  mix-compile:
    <<: *elixir_defaults
    steps:
      - checkout
      - run: bin/check-tool-versions
      - *attach_workspace
      - restore_cache:
          keys:
            - v1-mix-{{ arch }}-{{ checksum ".tool-versions" }}-{{ checksum "mix.lock" }}
      - run: mkdir -p ~/repo/.cache/{hex,mix}
      - run: mix local.hex --force
      - run: mix local.rebar --force
      - run: mix deps.get
      - save_cache:
          paths:
            - deps
            - .cache/hex
            - .cache/mix
          key: v1-mix-{{ arch }}-{{ checksum ".tool-versions" }}-{{ checksum "mix.lock" }}
      - run: mix compile --force --warnings-as-errors
      - persist_to_workspace:
          root: ~/repo
          paths:
            - .cache/hex
            - .cache/mix
            - deps
            - _build

  yarn-install:
    <<: *node_defaults
    steps:
      - checkout
      - run: bin/check-tool-versions
      - *attach_workspace
      - restore_cache:
          keys:
            - v1-node-modules-{{ arch }}-{{ checksum ".tool-versions" }}-{{ checksum "assets/yarn.lock" }}
      - run:
          working_directory: assets
          command: yarn install
      - run:
          working_directory: assets
          command: yarn run webpack --mode production
      - save_cache:
          paths:
            - assets/node_modules
            - .cache/yarn
          key: v1-node-modules-{{ arch }}-{{ checksum ".tool-versions" }}-{{ checksum "assets/yarn.lock" }}
      - persist_to_workspace:
          root: ~/repo
          paths:
            - assets/node_modules
            - priv/static/js

  formatter:
    <<: *elixir_defaults
    steps:
      - checkout
      - *attach_workspace
      - run: mix format mix.exs "lib/**/*.{ex,exs}" "test/**/*.{ex,exs}" --check-formatted

  eslint:
    <<: *node_defaults
    steps:
      - checkout
      - *attach_workspace
      - run:
          working_directory: assets
          command: yarn run lint

  exunit:
    <<: *elixir_defaults
    steps:
      - checkout
      - *attach_workspace
      - run: dockerize -wait tcp://localhost:5432 -timeout 1m
      - run: mix test --cover
      - store_test_results:
          path: ~/repo/tmp/test-results
      - store_artifacts:
          path: ~/repo/cover
          destination: exunit-coverage-report

workflows:
  version: 2
  build-test-deploy:
    jobs:
      - mix-compile
      - yarn-install:
          requires:
            - mix-compile
            # Phoenix includes javascript deps that are referenced as
            # a relative path in package.json
      - formatter:
          requires:
            - mix-compile
      - eslint:
          requires:
            - yarn-install
      - exunit:
          requires:
            - mix-compile
            - yarn-install
```
