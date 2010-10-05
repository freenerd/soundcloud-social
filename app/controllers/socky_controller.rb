require 'json'

class SockyController < ApplicationController

  skip_before_filter :verify_authenticity_token

  # This has no effect on client side
  def subscribe
    Socky.send ({:action => "subscribe", 
                 :client => (params[:client_id] || '')}.to_json)
    render :text => "ok"
  end

  def unsubscribe
    Socky.send ({:action => "unsubscribe",
                 :user => (params[:client_id] || '')}.to_json)
    render :text => "ok"
  end

  # Performed when user has chosen username
  def login
    Socky.send ({:action  => "login", 
                 :client  => (params[:client_id] || ''),
                 :user    => params[:user]}.to_json)
  render :text => "ok"
  end

  def message
    Socky.send ({:action  => "message", 
                 :client  => (params[:client_id] || ''),
                 :user    => params[:user],
                 :message => params[:message]}.to_json)
    render :text => "ok"
  end

  def start
    Socky.send ({:action  => "message", 
                 :client  => (params[:client_id] || ''),
                 :postion => (params[:position] || '')}.to_json)
    render :text => "ok"
  end

  def pause
    Socky.send ({:action => "pause",
                 :client => (params[:client_id] || '')}.to_json)
    render :text => "ok"
  end

  def reset
    Socky.send ({:action => "reset",
                 :client => (params[:client_id] || '')}.to_json)
    render :text => "ok"
  end
end

