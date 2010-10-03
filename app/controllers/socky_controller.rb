class SockyController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def subscribe
    Socky.send "subscribe:" + params[:client_id] || ''
    #Socky.send do |page|
      #page.insert_html :top, 'messages', render(:partial => "login_message", :locals => {:user => params[:client_id]})
    #end
    render :text => "ok"
  end

  def unsubscribe
    Socky.send "unsubscribe:" + params[:client_id] || ''
    #Socky.send do |page|
      #page.insert_html :top, 'messages', render(:partial => "logout_message", :locals => {:user => params[:client_id]})
    #end
    render :text => "ok"
  end

  def message
    puts "A message"
    puts params
    Socky.send "message:" + params[:user] + ':' + params[:message] || ''
    #Socky.send do |page|
      #page.insert_html :top, 'messages', render(:partial => "message", :locals => {:user => params[:current_user], :message => params[:message]})
    #end
    #render :update do |page|
      #page << "$('message').clear();"
    #end
    render :text => "ok"
  end

  def start
    Socky.send "start:" + params[:position] || ''
    render :text => "ok"
  end

  def pause
    Socky.send "pause:"
    render :text => "ok"
  end

  def reset
    Socky.send "reset:"
    render :text => "ok"
  end
end

