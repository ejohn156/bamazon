# bamazon
## Overview
This application creates an Amazon-like virtual storefront using inquirer and mysql npm's
The application will display all the products available on bamazon, gathering the data from a mysql table called bamazon. Once the products are displayed the program will prompt the user to to select one of the items by it's unique id. once this has been selected the user will be asked how much of that product they would like to purchase. If the id and quantity are valid the program will update the bamazon table and will display the total cost of the user's purchase. if the transaction is invalid then an error message will appear instead of the total cost and will explain to the user what went wrong (invalid id/insufficient quantity). Once the transaction is complete then the user will be asked if they would like to continue shopping. If "yes" is chosen the program will re-run itself, if "no" is chosen a goodbye message will display and the terminal will end the program.

