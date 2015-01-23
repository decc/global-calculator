require_relative 'model/global_2050_model'
require 'sinatra'
require 'json/pure'

# --------------------------------------------------------
# cache the cfps for quick access v22
# --------------------------------------------------------
class Cache
  @@cfps

  def self.init()
    s = "11111111111111111111111111111111111111111111111111111111111";
    g = Global2050ModelResult.new
    a = []
    a << g.calculate_cfps_v22(s)
#    #puts "--------------------------------------------------"
#    #puts a
#    #puts "--------------------------------------------------"
    
    @@cfps = a
    #puts "--------------------------------------------------"
    #puts @@cfps
    #puts "--------------------------------------------------"
  end

  def self.cfps()
    return @@cfps
  end
end



# --------------------------------------------------------
# initb the cfps cache
# --------------------------------------------------------
configure do
  #puts "init cache"
  Cache::init()
end

# --------------------------------------------------------
# send cfps from cache
# --------------------------------------------------------
get '/cfps_v22' do
  Cache::cfps().to_json
end



# --------------------------------------------------------
# make sure globcalc-v22-21-01-2015.html is sent on default
# --------------------------------------------------------
get '/' do
  send_file "public/globcalc-v22-21-01-2015.html"
end


# --------------------------------------------------------
# pathway access shortcut demo
# --------------------------------------------------------
get '/foe/?' do
  redirect "/globcalc-v22-21-01-2015.html?levers=22rfoe2s23be22312333333333rrr2rr2223333333111112sp211111111/lifestyle/en"
end




# --------------------------------------------------------
# sankey data server for prototype 22
# --------------------------------------------------------
get '/serve_sankey_v22/:parameterstring' do
  #puts "---- start get -------------"
  s = params[:parameterstring]

  # do some brut force testing and input error fixing --> needs to be improved !
  #puts "original params  = " + s

  # !!! ATTENTION: this needs to be flexible for different versions of calculator !!! :
  if s.length != 59
    s = "11111111111111111111111111111111111111111111111111111111111";
    #puts "corrected params = " + s
  end
  g = Global2050ModelResult.new
  a = []
  a << g.calculate_sankey_v22(s)
  ##puts "--------------------------------------------------"
  ##puts a
  ##puts "--------------------------------------------------"
  a.to_json
end

# --------------------------------------------------------
# data plus setup server for prototype 22
# --------------------------------------------------------
get '/serve_plus_setup_v22/:parameterstring' do
  #puts "---- start get -------------"
  s = params[:parameterstring]

  # do some brut force testing and input error fixing --> needs to be improved !
  #puts "original params  = " + s

  # !!! ATTENTION: this needs to be flexible for different versions of calculator !!! :
  if s.length != 59
    s = "11111111111111111111111111111111111111111111111111111111111";
    #puts "corrected params = " + s
  end
  g = Global2050ModelResult.new
  a = []
  a << g.calculate_pathway_plus_setup_v22(s)
  ##puts "--------------------------------------------------"
  ##puts a
  ##puts "--------------------------------------------------"
  a.to_json
end
# --------------------------------------------------------
# data server for prototype 22
# --------------------------------------------------------
get '/serve_v22/:parameterstring' do
  #puts "---- start get -------------"
  s = params[:parameterstring]

  # do some brut force testing and input error fixing --> needs to be improved !
  #puts "original params  = " + s

  # !!! ATTENTION: this needs to be flexible for different versions of calculator !!! :
  if s.length != 59
    s = "11111111111111111111111111111111111111111111111111111111111";
    #puts "corrected params = " + s
  end
  g = Global2050ModelResult.new
  a = []
  a << g.calculate_pathway_v22(s)
  ##puts "--------------------------------------------------"
  ##puts a
  ##puts "--------------------------------------------------"
  a.to_json
end


