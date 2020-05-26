#!/bin/bash
directory=""
while getopts "d:" flag; do
    case "${flag}" in
    d)
        directory=$OPTARG
        ;;
    esac
done

if [ -z "$directory" ]; then
    echo "A directory entry '-d <directory>' is required."
    echo "The path must contain the 'admin' and 'tssg-tech' folders."
    exit 1
fi

echo "Mongo restoring from: $directory"
mongorestore \
-u root \
-p sch3dul3db \
--authenticationDatabase admin \
--authenticationMechanism SCRAM-SHA-1 \
--drop \
$directory/
echo "done"
