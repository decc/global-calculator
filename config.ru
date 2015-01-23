# encoding: utf-8
require 'rubygems'
require 'bundler'
Bundler.setup

# The server
require './hi-4-x.rb'

# To compress the data going back and forth
use Rack::Deflater
# This logs access and errors
use Rack::CommonLogger

# This is in hi-4-x.rb
run Sinatra::Application
