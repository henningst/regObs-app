 coffee --watch -c -b -o ../connection/ *.coffee & cd database/; coffee --watch -c -b -o ../../database/ *.coffee & 

 cd ..
 while :; do handlebars ./templates/* -f ../templates.js; sleep 2; done

