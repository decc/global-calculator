# encoding: utf-8
require 'rubygems'
require 'bundler'
Bundler.setup

# The server can run in two modes, 'production' and 'development'
# the mode is set in the RACK_ENV or RAILS_ENV environment variables
ENV['RACK_ENV'] = ENV['RAILS_ENV'] if ENV['RAILS_ENV']

# The server
require './hi-4-x.rb'

# To compress the data going back and forth
use Rack::Deflater
# This logs access and errors
use Rack::CommonLogger

# This is in hi-4-x.rb
run Sinatra::Application
