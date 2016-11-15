# echo "rvm_trust_rvmrcs_flag=1" >> ~/.rvmrc
# echo "rvm use 2.2.2@th" >> .rvmrc
# whenever --update-crontab --set environment=development

# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever

set :output, File.join(Whenever.path, "log", "cron.log")

every 1.day do
  rake "remind:backup" # db backup
end

#every 1.day do  # 1.minute :hour 3.hours 1.day 1.week 1.month 1.year is also supported
every 1.day, :at => '6:00 pm' do
  #runner "User.unsubscribe"
  runner "Remind.daily" #rake "remind:daily"
end

every 1.week do  # 1.minute :hour 3.hours 1.day 1.week 1.month 1.year is also supported
  #runner "User.unsubscribe"
  runner "Remind.weekly" #rake "remind:weekly"
end

every 1.month do  # 1.minute :hour 3.hours 1.day 1.week 1.month 1.year is also supported
  #runner "User.unsubscribe"
  runner "Remind.monthly" #rake "remind:monthly"
end