#!/bin/bash
directory=""
hlp=0
appendDT=1
now=""
while getopts "htd:" flag; do
    case "${flag}" in
    h)
        hlp=1
        ;;
    d)
        directory=$OPTARG
        ;;
    t)
        appendDT=0
        ;;
    esac
done

if [ "$hlp" -eq "1" ]; then
        echo "  Dump mongo database.  Currently from default port 27017"
        echo "  mongo.dump.sh -d <directory> -t  -h"
        echo "  Directory is target path.  admin & tssg-tech databases will be dumped to this path."
        echo "  -t forces date and time to be eliminated from path.  Default is date & time appended to path as the next level."
        echo "  -h produces this listing.  Process will then exit."
        echo done.
        exit
fi

if [ -z directory ]; then
    echo "A directory entry '-d <directory>' is required."
    echo "The 'admin' and 'tssg-tech' folders will be dumped to this directory."
    exit
fi

if [ $appendDT -eq 1 ]; then
    now=/$(date +"%Y-%m-%d-%H-%M-%S")
    directory=$directory$now
fi

echo "Dumping Mongo database to: $directory"
mongodump \
    -u root \
    -p sch3dul3db \
    --authenticationDatabase admin \
    --authenticationMechanism SCRAM-SHA-1 \
    --out $directory

echo "done"
