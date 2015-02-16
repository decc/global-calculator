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
6. cd ../../public/gc-anim
7. wget -nH --cut-dirs=1 --no-parent -r http://d2ow8032j7094s.cloudfront.net/20150123/index.html # This downloads 1.5 GB of images 
8. cd ../..
7. rackup # This starts the server

The bundle step should install all the dependencies. If it fails it may ask you to check a particular 'gem' installs manually. Doing that normally fixes the problem and the step can be repeated.

The bundle exec Rake step compiles the C version of the model. This can take tens of minutes, and requires plenty of memory.

You should now be able to browse to http://127.0.0.1:9292 and see the local copy running.

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

Live deployment
---------------

These are some notes on how we are deploying this live.

1. We are using Amazon Route 53 to route requests to http://tool.globalcalculator.org to the CloudFront caching service
2. The CloudFront caching service routes requests to an ElasticLoadBalancer
3. The ElasticLoadBalancer routes requests to between two and twenty EC2 instances running Ubuntu 14.04
4. The EC2 instances are running nginx. These:
  a. Detects requests to the public/gc-anim folder and route these to another CloudFront caching service (see gc-anim below)
  b. Otherwise routes requests using Passenger to versions of this code running on Ruby 2.2

The gc-anim folder
------------------

The gc-anim folder contains several GB of climate change maps. These are too large to be placed under git version control.

Instead, we store a copy of the gc-anim folder in Amazon S3. The images can be accessed at http://d2ow8032j7094s.cloudfront.net/20150123/index.html

Requests to the EC2 instance for these images get redirected by nginx to the CloudFront cache, which in turn gets them from S3.

To get a local copy of these images for offline use, follow the instructions in public/gc-anim/README.md

Scaling
-------

The live version scales up and down using an autoscaler. This is set to watch for an alarm when the CPU load of the instances in the load balancer go above 20%, and then deploy an extra instance based on a launch configuration that uses an AMI that we have pre-prepared.

Updating
--------

Changes to the gc-anim folder need to be re-synced with Amazon S3 (see public/gc-anim/README.md).

If the code has come from Markus's version, common things that need to change include:

1. Removing references to ``_V22`` in ruby code, particularly in the model folder
2. Removing ``puts`` statements in ``hi-4-x.rb`` script
2. Changing the global_calculator_model require in the ``hi-4-x.rb`` ``require_relative '../model/global_2050_model'`` 

Changes should be tested locally, then committed to github.com

Then, deploy a new Ubuntu 14.04 instance, using the existing ami. Give that instance a public IP.

ssh into that instance, and do git pull to get the new code. 

Then restart nginx ``sudo service nginx restart``

Test whether that server seems to be providing the right result.

Then create an ami from that server.

Then create a new launch configuratio using that ami.

Then change the auto scale group to use that launch configuration.

Then kill off one of the existing running instances, and wait to see the new instance created. Check that it is using the right ami. Possibly assign it a public IP address so you can check it is serving the right things.

Then kill off any remaining running instances, and wait to see them recreated.

Check everything is working.

If not, switch the auto scale group back to the old launch configuration, then kill all the new instances.




