require 'net/http'

class ListenController < ApplicationController
  def show 
    @userpermalink = params[:userpermalink] 
    @trackpermalink =  params[:trackpermalink]
=begin
    # resolve url
    resolver_url = 'http://api.soundcloud.com/resolve?url='
    original_url = 'http://soundcloud.com/' + params[:userpermalink] + '/' + params[:trackpermalink]
    url = resolver_url + original_url
    puts url
    response = Net::HTTP.get_response(URI.parse(url))
    puts response
    if response.is_a? Net::HTTPRedirection
      puts response['location']
      @trackurl = response['location']
    end
=end
  end

end
