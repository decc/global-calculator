def print_folder(f,name)
  f.puts "<h1>#{name}/h1>"
  f.puts "<ul>"
  Dir.entries(name).each do |file|
    next if file == '.' || file == '..' || file == '.DS_Store'
    f.puts "<li><a href='#{name}/#{file}'>#{name}/#{file}</a></li>"
  end
  f.puts "</ul>"
end

File.open('index.html','w') do |f|
  f.puts "<html><body>"
  print_folder(f, 'pr_nonotes')
  print_folder(f, 'pr_withnotes')
  print_folder(f, 'tas_nonotes')
  print_folder(f, 'tas_withnotes')
  f.puts "</body></html>"
end
