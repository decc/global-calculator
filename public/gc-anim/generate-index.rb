def print_folder(f,name)
  Dir.entries(name).each do |file|
    next if file == '.' || file == '..' || file == '.DS_Store'
    f.puts "<li><a href='#{name}/#{file}'>#{name}/#{file}</a></li>"
  end
end

File.open('index.html','w') do |f|
  f.puts "<html><body>"
  f.puts "<h1>pr_nonotes</h1>"
  f.puts "<ul>"
  print_folder(f, 'pr_nonotes')
  f.puts "</ul>"
  f.puts "<h1>tas_nonotes</h1>"
  f.puts "<ul>"
  print_folder(f,'tas_nonotes')
  f.puts "</ul>"
  f.puts "</body></html>"
end
