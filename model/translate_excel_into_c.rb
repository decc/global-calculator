begin
  require 'excel_to_code'
rescue LoadError
  puts "You need to install excel_to_code, try sudo gem install excel_to_code or possibly sudo gem21 install excel_to_code"
  exit
end

$this_dir = File.dirname(__FILE__)

# This needs to be changed when the spreadsheet changes
def setup(command)
  command.excel_file = File.join($this_dir, "2050Model.xlsx")
  command.output_directory = File.join($this_dir, 'global_2050_model')
  command.output_name = 'global_2050_model'

  command.named_references_that_can_be_set_at_runtime = ['webtool.user.choices']

  command.named_references_to_keep = lambda do |named_reference|
    named_reference =~ /^(webtool\.|g\.1pager|g\.supertable)/i
  end

  command.actually_compile_code = true
  command.actually_run_tests = true
end

def translate_excel_into_c
  command = ExcelToC.new
  setup(command)
  command.go!
end

def create_a_test_for_c
  command = ExcelToTest.new
  setup(command)
  command.actually_run_tests = true
  command.go!
end

def change_last_modified_date
  File.open(File.join($this_dir, 'global_2050_model', 'global_2050_model_version.rb'),'w') do |f|
    f.puts "def Global2050Model.last_modified_date() @last_modified_date ||= Time.utc(*#{Time.now.to_a}); end"
  end
end

translate_excel_into_c
change_last_modified_date
