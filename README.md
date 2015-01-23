global-calculator
=================

The source code to the web interface to the Global Calculator.

For more information about the global calculator, see: http://www.globalcalculator.org

To play with this web interface, go to: http://tool.globalcalculator.org

Canonical source: http://github.com/decc/global-calculator

Please report issues and suggest patches there.

Installing a local copy
-----------------------

What you need:

1. A server with at least 4 GB and ideally 8 GB of memory
2. Running a flavour of Unix
3. With the standard build tools installed
3. With version 2.1 of Ruby installed, including development headers

In the util folder is a bash script that we use to set up a Ubuntu 14.04 server to be capable of running the global calculator.
This can give clues on how to get the system running. 

Steps:

1. git clone http://github.com/decc/global-calculator
2. cd global-calculator
3. bundle  
4. cd model/global_2050_model
5. bundle exec rake 
6. cd ../..
7. rackup # This starts the server

The bundle step should install all the dependencies. If it fails it may ask you to check a particular 'gem' installs manually. Doing that normally fixes the problem and the step can be repeated.

The bundle exec Rake step compiles the C version of the model. This can take tens of minutes, and requires plenty of memory.

You should now be able to browse to http://0.0.0.0:9292 and see the local copy running.

Altering the spreadsheet
------------------------

If you change the spreadsheet, you need to re-translate it into its C equivalent. 

To do this:

1. change the spreadsheet in model/ 
2. cd model
3. bundle exec ruby translate_excel_into_c.rb

Note:

1. that the C version only includes outputs that are given in named ranges starting with 'webtool'
2. That translating a spreadsheet of this size needs at least 4 GB of RAM and can take 5 or 6 hours.



