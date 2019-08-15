#!/bin/bash
TDIR=`echo $PWD | sed "s/\/scripts//"`
if [ "$1" = "i" ] 
then
	echo "removing image files"
	rm -fr $TDIR/.dist/image-compare/baseline/*png
	rm -fr $TDIR/.dist/image-compare/screenshots/actual/*png
	rm -fr $TDIR/.dist/image-compare/screenshots/diff/*png
fi

cd $TDIR/errorShots
rm -fr *.png
