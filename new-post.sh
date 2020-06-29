#!/bin/bash

if [ "$1" == "" ]; then
  read -rp 'Post Name: ' post_name
else
  post_name=$1
fi

post_date=$(date --iso-8601)
dasherized=$(echo "${post_name// /-}" | tr '[:upper:]' '[:lower:]')
post="src/pages/blog/${dasherized}/index.md"

if [ -f "$post" ]; then
  echo "$post already exists"
  exit 1
fi

mkdir "$(dirname "$post")" &> /dev/null || true
cat <<EOF > "$post"
---
title: "${post_name}"
tags: []
date: ${post_date}
---

Write!
EOF

echo "Created $post"
