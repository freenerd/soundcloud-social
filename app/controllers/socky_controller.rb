class SockyController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def subscribe
    Socky.send "#{params[:client_id]} has come online"
    #Socky.send do |page|
      #page.insert_html :top, 'messages', render(:partial => "login_message", :locals => {:user => params[:client_id]})
    #end
    render :text => "ok"
  end

  def unsubscribe
    Socky.send "#{params[:client_id]} went offline"
    #Socky.send do |page|
      #page.insert_html :top, 'messages', render(:partial => "logout_message", :locals => {:user => params[:client_id]})
    #end
    render :text => "ok"
  end

  def message
    Socky.send params[:message]
    #Socky.send do |page|
      #page.insert_html :top, 'messages', render(:partial => "message", :locals => {:user => params[:current_user], :message => params[:message]})
    #end
    #render :update do |page|
      #page << "$('message').clear();"
    #end
    render :text => "ok"
  end

  def start
    Socky.send "start"
    render :text => "ok"
  end

  def pause
    Socky.send "pause"
    render :text => "ok"
  end

  def reset
    Socky.send "reset"
    render :text => "ok"
  end
end

