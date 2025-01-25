# What I learned during this project

## Development Environment

For frontend, use LiveServer as the port (e.g. http://127.0.0.1:5500). And for PHP, see under PHP section for setting up different port. 

## PHP

Start your PHP server from the folder your PHP files are in. e.g. Go to backend folder in terminal and then: php -S localhost:8000
Make sure at the top of your PHP files you have these headers:

header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Adjust the origin to match your Live Server URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

- Debugging
    - echo
    - print_r($var)
    - var_dump($var) - shows info like data type

PDO = PHP Data Objects = an interface to access databases like SQLite, MySQL etc. 

## SQLite

When creating the database, first create the db file and then use SQLite explorer to populate the db:
1. Right click on the db and select 'new query'
2. Write the script
3. Right click on script and select 'run query'


