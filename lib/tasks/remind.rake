#require 'rake'
namespace :remind do
  desc 'daily backup'
  task :backup => :environment do
    # your code here ...
    FileUtils.cp(File.join(Rails.root, 'db', "#{Rails.env}.sqlite3"), File.join(Rails.root, 'db', "#{Rails.env}.#{DateTime.now.utc.to_s(:number) }.sqlite3"), {verbose:true})
  end
end
