require 'json'

class SockyController < ApplicationController

  skip_before_filter :verify_authenticity_token

  # This has no effect on client side
  def subscribe
    Socky.send ({:action => "subscribe",
                 :channel => params[:channel],
                 :client => (params[:client_id] || '')}.to_json)
    render :text => "ok"
  end

  def unsubscribe
    Socky.send ({:action => "unsubscribe",
                 :channel => params[:channel],
                 :user => (params[:client_id] || '')}.to_json)
    render :text => "ok"
  end

  # Performed when user has chosen username
  def login
    Socky.send ({:action  => "login", 
                 :user    => params[:user],
                 :channel => params[:channel]}.to_json,
               :to => { :channels => params[:channel] })
  render :text => "ok"
  end

  def logout
    Socky.send({:action  => "logout", 
                 :user    => params[:user],
                 :channel => params[:channel]}.to_json,
               :to => { :channels => params[:channel] })
  render :text => "ok"
  end


  def message
    Socky.send( {:action  => "message",
                 :client  => (params[:client_id] || ''),
                 :user    => params[:user],
                 :channel => params[:channel],
                 :message => params[:message]}.to_json,
                :to => { :channels => params[:channel] })
    render :text => "ok"
  end

  def start
    Socky.send ({:action  => "start", 
                 :channel => params[:channel],
                 :client  => (params[:client_id] || ''),
                 :postion => (params[:position] || '')}.to_json,
                :to => { :channels => params[:channel] })
    render :text => "ok"
  end

  def pause
    Socky.send ({:action => "pause",
                 :channel => params[:channel],
                 :client => (params[:client_id] || '')}.to_json,
                :to => { :channels => params[:channel] })
    render :text => "ok"
  end

  def reset
    Socky.send ({:action => "reset",
                 :client => (params[:client_id] || '')}.to_json)
    render :text => "ok"
  end
end

