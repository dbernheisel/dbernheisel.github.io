---
layout: post
status: publish
published: true
title: Synching an External USB Drive with Network NAS
date: '2013-06-02 18:10:59 -0400'
date_gmt: '2013-06-02 23:10:59 -0400'
categories:
- Shell
tags: [bash, backup]
---

## Needs cleanup

<p>I recently bought a MacBook Pro with a limited 256GB SSD. It's great, btw, but it requires me to now store all my music, movies, and archival-type files on an external drive. It scares me a bit to have all that stuff on a single USB-powered drive, so I also set up a network NAS that contains 2 mirrored 1TB drives (I salvaged these from my desktop that I sold to buy my MacBook).</p>
<p>Enter problem: I'm lazy. I don't like manually backing everything up. I just want to manage the stuff I put on the external drive, not the NAS drive.</p>
<p>Enter solution: BASH script, and launchd.</p>
<p><a id="more"></a><a id="more-10908"></a></p>
<p>Here's the files I use (you'll need to edit to your systems needs): <a href="http:&#47;&#47;bernheisel.com&#47;wp-content&#47;uploads&#47;2013&#47;06&#47;backup.zip">Backup Files<&#47;a></p>
<p>Overview:</p>
<ol>
<li>I write BASH scripts at work, so this was my goto place for automating something I don't want to do.<&#47;li>
<li>I use a mac, so I used launchd to kick off the script when relevant<&#47;li>
<li>I want to know when its running, so I used an icon I found on the internet to make it look pretty, and placed the lock folder on my desktop.<&#47;li><br />
<&#47;ol></p>
<h2>Getting the core logic:<&#47;h2><br />
Here's the BASH Script in its entirety:</p>
<pre lang="bash" line="1" escaped="true">#!&#47;bin&#47;bash</p>
<p>remote="&#47;Volumes&#47;Volume_1"<br />
local="&#47;Volumes&#47;Storage"<br />
LOCK=~&#47;Desktop&#47;Synching<br />
logging=~&#47;backup-rsync-log.txt<br />
sleeptime=20<br />
maxthreads=20</p>
<p>set -e<br />
function cleanup {<br />
  echo "Removing Synching folder"<br />
  rm -rf $LOCK<br />
}</p>
<p>trap cleanup EXIT</p>
<p>mkdir $LOCK || { echo "Backup already running" ; exit 1 ; }<br />
Rez -append ~&#47;backup.rsrc -o ~&#47;Desktop&#47;Synching&#47;$'Icon\r' # set the icon to lock folder<br />
SetFile -a C ~&#47;Desktop&#47;Synching # initiate the icon<br />
SetFile -a V ~&#47;Desktop&#47;Synching&#47;$'Icon\r' # hide the icon file</p>
<p>sleep 15 # give time for mounting</p>
<p># Check if external drive is mounted<br />
if mount | grep "on ${local}" > &#47;dev&#47;null; then<br />
  echo "Storage drive is mounted"</p>
<p>  # Check if network NAS is mounted<br />
  if mount | grep "on ${remote}" > &#47;dev&#47;null; then<br />
    echo "Remote NAS is mounted"<br />
    echo "Running rsync"</p>
<p>    # loop over all root external drive folders and do an rsync for each, up to a limit<br />
    for dir in "$local"&#47;*&#47;; do<br />
      folder=`basename "$dir"`</p>
<p>      # create the folder if it doesn't exist, keeping permissions<br />
      if [ ! -d "${remote}&#47;${folder}" ]; then<br />
        mkdir -p "$remote"&#47;"$folder"<br />
        chown --reference="$dir" "${remote}&#47;${folder}"<br />
        chmod --reference="$dir" "${remote}&#47;${folder}"<br />
      fi</p>
<p>      echo -e "\nStarting rsync $(date +%Y%m%d_%H%M%S) of" $dir >> $logging</p>
<p>      # don't go crazy with rsync, so limit it<br />
      while [ `ps -ef | grep -c [r]sync` -gt ${maxthreads} ]; do<br />
        sleep ${sleeptime}<br />
      done</p>
<p>      # start rsync parallel threads.<br />
      nohup rsync -avh --delete "$dir" "$remote"&#47;"$folder"&#47; >$logging 2>&amp;1 &amp;</p>
<p>    done<br />
    wait<br />
    echo "Done"<br />
  else<br />
    echo "Remote NAS is NOT mounted"<br />
  fi<br />
else<br />
  echo "Storage drive is NOT mounted"<br />
fi<&#47;pre><br />
There's a good amount of logic in there, so let's go through it.</p>
<p>I don't like hardcoding stuff I have to say over and over, so I start by naming the variables in case I need to reuse this code later. The variables are</p>
<ul>
<li>My external hard drive, put into <code>$local<&#47;code><&#47;li>
<li>My network NAS drive, put into <code>$remote<&#47;code><&#47;li>
<li>My rsync limiter, put into <code>$maxthreads<&#47;code><&#47;li>
<li>How long I want rsync to wait before trying to launch another thread, put into <code>$sleeptime<&#47;code><&#47;li>
<li>Where I want the double-purposed folder, 1) to ensure I only have one of these scripts running at a time, and 2) visually tell me when the script is running; this is put into <code>$LOCK<&#47;code><&#47;li>
<li>Lastly, so I can debug if needed, I log all the actions into a text file, put into <code>$logging<&#47;code><&#47;li><br />
<&#47;ul><br />
So now that I have everything named. Now it's time for some real logic.<br />
I start out by checking whether my script is already running. I check by attempting to create a folder. If the folder is already created, it'll fail, and then exit the script. Pretty simple. I can't tell you the specifics, but creating a folder is a great way of setting up a lock without conflicts, from what I've read online. In my script, I also used the folder as a status to inform me when the script is running. I also thought about creating a simple menubar app that'll show a spinning gear, but I don't really feel like overengineering this.</p>
<p>Since my wife also uses my computer, I don't want to confuse her when a folder pops up on the desktop with nothing in it. So, I'm going to disguise it with an icon (more on the later). Sure, she could still double-click it and find nothing, but again, I'm lazy and this should be good enough. There are plenty of other things to spend my time on.</p>
<p>So, I have my safety set so I'm not executing this script over on top of itself. Now I need to determine whether my necessary drives are mounted, I do this by nesting two if statements; one to check if the external drive is mounted, and another to check if the NAS is mounted. Obviously, I don't want anything to happen unless the drives are mounted. If they're not mounted, I exit.</p>
<p>Next, I go through the folders in the root of the external drive. I want to be somewhat recursive, so I do a for loop over the root folders on the drive, and start an rsync on each folder. For that to work, I need to make sure the destination folder is created, preferably with the same permissions.</p>
<p>If you have one root folder with a bunch of subfolders (for example a Music folder with a bunch of Artist subfolders), then it might be good for you to start your loop there so this is a more-effective script.</p>
<p>Inside every folder, I start an rsync thread distributed among the folders. However, I don't want to stress my computer out with a thousand rsync threads, so before I start a new thread, I check to see how many there are and possibly limit it (for me, I arbitrarily chose a 20 thread cap). I determine this by counting how many rsync processes there are, so I execute ps, pipe it to grep to grab what I need. the grep -c flag counts them. Then, I compare it to my previously-defined cap. If it's at the limit, then I put it in a while loop that sleeps until the thread count is back down.</p>
<p>If you're familiar with command line operations, then you should read up on the rsync manual (run "man rsync" in the terminal). There's a lot of nifty things you can do with this, for example, you can backup over SSH or SFTP. I opted for the flags -a (archive, aka carry over all the permissions and recurse any subdirectories), -v (be verbose, I want this so I can catch everything it's doing and redirect that to my log file in <code>$logging<&#47;code>), and -h (output human-readable stuff, so I don't have to count the zeros in all the file sizes).</p>
<p>Lastly (as far as the script goes), I want to make sure that whenever my script exits, be it because of an error or anything else, I want my lock&#47;status folder is removed. To accomplish this, I just trapped any kind of exit by executing a small function that removes the lock folder. I put it near the top since it needs to be defined before it could be used. Sometimes I forget that you can create functions in BASH.</p>
<p>This can be optimized more, but this is where I'm finished since it achieves my goal of lazily backing up my external hard drive. If you have ideas, drop them in the comments or link out to your explanation!</p>
<h2>Launching it when I need to.<&#47;h2><br />
So far, we just have a script that we have to manually kick off in order for it to work. I am still too lazy and instead want my $2000 computer to do the work for me. I was tempted to just use cron to have this script run automatically every 5 minutes, but I thought that was wasteful, since it's probable that this script will fail most times it's launched. I read around and found Mac's tool called launchd, which watches for events, and then launches actions.</p>
<p>I'm unfamiliar with plists still, so I really just piggybacked on the <a href="http:&#47;&#47;rajeev.name&#47;2008&#47;09&#47;01&#47;automated-osx-backups-with-launchd-and-rsync&#47;">backs of other giants<&#47;a>. Step 3 on this page shows me how to do this (btw, this  guy solves the same problem here, but does it differently; check his solution out if you're interested). Summed up, create a plist, place it in your ~&#47;Library&#47;LaunchAgents folder (tilde represents your home folder), and you're done!</p>
<p>The important bits of the .plist file are the</p>
<ul>
<li>Program<&#47;li>
<li>WatchPaths<&#47;li>
<li>LowPriorityIO<&#47;li><br />
<&#47;ul><br />
For the program key, I'm putting the path to the BASH script I created above.<br />
For the WatchPaths key, I'm putting in &#47;Volumes directory, since I want this script to launch every time something changes in &#47;Volumes. You could change this to the specific name of your drive as well--it should work the same and probably better.<br />
For the LowPriorityIO key, I'm putting the "YES" value, so I can tell my computer to not really give a lot of resources to this script. Again, I want this to be nearly invisible to me--I'd hate to feel my computer choke just because of a backup script.</p>
<p>You still need to add a label to the plist, so call it whatever you want.</p>
<p>Save it, and place it in your ~&#47;Library&#47;LaunchAgents folder. Restart.</p>
<p>Now you should have a fully working solution.</p>
<h2>Making it look <em>slightly<&#47;em> better.<&#47;h2><br />
I'm not <i>quite<&#47;i> finished yet. I wanted to have my lock folder be pretty with an icon, so I went back to my BASH script and added a couple lines to set the folder icon. I found the commands <a href="http:&#47;&#47;apple.stackexchange.com&#47;questions&#47;6901&#47;changing-a-file-or-folder-icon-using-the-terminal">here (Stack Exchange)<&#47;a>.</p>
<p>First, grab an icon you want. I supplied one already, but you might have a different preference. I found mine by googling, and you might find it helpful to google with "filetype:png" so you find an icon with transparency. Then go to <a href="http:&#47;&#47;iconverticons.com&#47;online&#47;">http:&#47;&#47;iconverticons.com&#47;online&#47;<&#47;a> and convert it to Mac-compatible .icns.</p>
<p>Second, create a new temporary folder. We're going to apply this icon to it so we can grab a file we need from it once it's set. Then, right-click the folder, and drag-and-drop the .icns file to the Icon in the top left.</p>
<p>Third, run a command-line tool against the folder.<br />
<code>DeRez -only icns path&#47;to&#47;tempfolder&#47;$'Icon\r' > backup.rsrc<&#47;code><br />
This will give you what you need in order to set the lock folder icon. Store this file somewhere you don't look often (I stored mine next to the backup script in my home folder). You can delete the temporary folder now and the original image you downloaded.</p>
<p>Fourth, modify the backup script to apply the icon.<br />
After the line where we make the lock folder, run a Rez command and a couple SetFile commands.<br />
<code>Rez -append ~&#47;backup.rsrc -o ~&#47;Desktop&#47;Synching&#47;$'Icon\r' # set the icon to lock folder<&#47;code><br />
<code>SetFile -a C ~&#47;Desktop&#47;Synching # initiate the icon<&#47;code><br />
<code>SetFile -a V ~&#47;Desktop&#47;Synching&#47;$'Icon\r' # hide the icon file<&#47;code><br />
The first command adds the icon to the lock directory.<br />
The second command sets the folder attributes, which allows Finder to appreciate your new icon (otherwise, it won't recognize that cool icon you added)<br />
The third command sets the folder to invisible. This is totally optional, but if you ever double-click the "Synching" folder you'll find the icon resource, and that just seems ugly to me--so let's hide it.</p>
<p>OK! YOU'RE DONE!</p>
<p>I guess I'm not so lazy after all.</p>
