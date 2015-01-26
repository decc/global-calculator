require_relative './model/global_2050_model'
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
# make sure globcalc.html is sent on default
# --------------------------------------------------------
get '/' do
  send_file "public/globcalc.html"
end


# --------------------------------------------------------
# pathway access shortcuts 
# --------------------------------------------------------
get '/foe/?' do
  redirect "/globcalc.html?levers=32334434433444444333314411212324myw121l121111113f2211111111/dashboard/en"
end
get '/distributedeffort/?' do
  redirect "/globcalc.html?levers=22rfoe2ss3besss1ssssssssssssssss222sssssss11111sr2211111111/dashboard/en"
end
get '/consumerreluctance/?' do
  redirect "/globcalc.html?levers=22rfoe2s23be22312333333333rrr2rr2223333333111112sp211111111/dashboard/en"
end
get '/lowactiononforests/?' do
  redirect "/globcalc.html?levers=22rfoe2333be3331333333332s333333222232332311111p32211111111/dashboard/en"
end
get '/consumeractivism/?' do
  redirect "/globcalc.html?levers=22rf32o333be333232222233322223222m323f3222111113s2211111111/dashboard/en"
end
get '/iea6ds/?' do
  redirect "/globcalc.html?levers=22rfoe2e13be1111c2c2c1n31hfjdcef222hp233f211111fn2211111111/dashboard/en"
end
get '/iea4ds/?' do
  redirect "/globcalc.html?levers=22rfoe2ib3becdd1ep2p2cp3e2ilgfgi222r3233j3111112f2211111111/dashboard/en"
end
get '/iea2ds/?' do
  redirect "/globcalc.html?levers=22rfzhgsi3bee331jx3xp3C333lnoojp222333332f111113r2211111111/dashboard/en"
end
get '/shellmountains/?' do
  redirect "/globcalc.html?levers=m22l3221w4211f3123333p23z32g1wd322223mqpfD111112A2211111111/dashboard/en"
end
get '/shelloceans/?' do
  redirect "/globcalc.html?levers=m21d22m3l3211p4123333c34jhogb4e422op3oqpt411111242211111111/dashboard/en"
end
get '/mottmacdonald/?' do
  redirect "/globcalc.html?levers=223C322C2C332pCpdzzn22p322of1lf2plp2rspAC211111322211111111/dashboard/en"
end
get '/climact/?' do
  redirect "/globcalc.html?levers=2233333333333333333331331fnnnnnn333222222d111112s2211111111/dashboard/en"
end
get '/icept/?' do
  redirect "/globcalc.html?levers=22rfzhgw33bee331dzzn2j33p2sn33jy2332322p2f11111232211111111/dashboard/en"
end
get '/rcp85/?' do
  redirect "/globcalc.html?levers=g311111111111111c1b111cybihogjgi233ssr2eAs11111gA2211111111/dashboard/en"
end
get '/rcp60/?' do
  redirect "/globcalc.html?levers=mjfffeedbmmosqr2jj2jj1s31bg11e11333213312111111112211111111/dashboard/en"
end
get '/rcp26/?' do
  redirect "/globcalc.html?levers=p1ql222n2fffcjgt3stttBppBhhg1d11y3x3333np311111ot2211111111/dashboard/en"
end
get '/tiamucl4ds/?' do
  redirect "/globcalc.html?levers=l23xiiiqpi2p2f1cf2poj12p12db1nr1ppp2p222ph11111c22211111111/dashboard/en"
end
get '/tiamucl2ds/?' do
  redirect "/globcalc.html?levers=l2wz222CBpp3pC3f2Dw3DC3plzgj1tA13pp2p223ri11111p22211111111/dashboard/en"
end
get '/wecpsijazz/?' do
  redirect "/globcalc.html?levers=rirfne2bb2bd1111jx3xpb13igihghih222pp23312111112f2211111111/dashboard/en"
end
get '/wecpsisymphony/?' do
  redirect "/globcalc.html?levers=jnrfxg22pobdeoo1zzzz3l23vqhwo3gm22233333bf111113r2211111111/dashboard/en"
end
get '/vegansociety/?' do
  redirect "/globcalc.html?levers=2222jjj21222gfgebf1jg1igcjgjeeefDDDDD11n2211111DB2211111111/dashboard/en"
end
get '/cambridgearchitecturalresearch/?' do
  redirect "/globcalc.html?levers=pps3p32p3p33333p2qqqqf33f2s33j33p2t2p1p21p11111p32211111111/dashboard/en"
end
get '/chathamhouselowmeat/?' do
  redirect "/globcalc.html?levers=22rfoe2ib3becdd1dr1hhcp3e2ilgfgi33433333j3111113g2211111111/dashboard/en"
end
get '/chathamhousehighmeat/?' do
  redirect "/globcalc.html?levers=22rfzhgsi3bee331dzzn2jC333lnoojp111333332f11111332211111111/dashboard/en"
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
  #puts "--------------------------------------------------"
  #puts a
  #puts "--------------------------------------------------"
  a.to_json
end


