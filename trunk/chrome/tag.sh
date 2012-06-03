#!/bin/bash

tmp=${files[@]}
echo ">$tmp<"
if [ -n "${tmp}" ]
then
	echo "vide"
fi
files[${#files[@]}]="version.txt"
files[${#files[@]}]="test"
echo ">${files[@]}<"
if [ -n "`echo ${files[@]}`" ]
then
	echo "non vide"
fi
echo ${files[*]}
for i in ${!files[*]} ; do echo "files[$i]=${files[$i]}" ; done
exit 1;

# Check changes from SVN
changes=`svn st -u`
tmp=`echo ${changes} | wc -l`
if [ $tmp -ne 1 ]
then
	echo ${changes}
	echo -n "There is some change. Do you want to continue ? [y/N]: "
	read -n 1 tmp && echo
	case $tmp in
		y|Y|o|O)
			;;
		*)
			exit 1
			;;
	esac
fi

version_old=`cat version.txt`
# Retrieving the version
if [ $# -ne 1 ]
then
	version=$version_old
	echo -n "Version [$version]: "
	read tmp
	if [ -n "$tmp" ]
	then
		version=$tmp
	fi
else
	version=$1
fi

# changing version.txt file
if [ "$version_old" != "$version" ]
then
	# Saving the version number
	echo $version > version.txt
	files[${#files[@]}]="version.txt"
else
	echo -n "The version have not changed. Do you want to continue ? [y/N]: "
	read -n 1 tmp && echo
	case $tmp in
		y|Y|o|O)
			;;
		*)
			exit 1
			;;
	esac
fi

# Commit release change
tmp=${files[@]}
if [ -n "${tmp}" ]
then
	svn commit -m "$version release." ${files[*]}
fi


releaseDate=`date +%G%m%d`

urlSource="https://auto-login-extension.googlecode.com/svn/trunk/"
urlTag="https://auto-login-extension.googlecode.com/svn/tags/auto-login-extension_v${version}_${releaseDate}"

svn copy $urlSource $urlTag -m "Tagging v${version} (${releaseDate})"

echo "Tag URL : $urlTag"

exit 0;

