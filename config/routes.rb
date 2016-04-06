Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  get 'fw10' => 'home#fw10'
  root 'home#index'
  get 'game_play' => 'home#show', as: :game_play

  get 'express_checkout' => 'orders#express_checkout'
  resources :users do
    resources :orders
  end

  resources :games

  post 'fw' => "users#fw", as: :fw

  post 'signin' => 'users#signin', as: :signin
  get 'signin' => 'users#signin', as: :signin_get

  post 'signup' => 'users#signup', as: :signup
  get 'signup' => 'users#signup'

  get 'signout' => 'users#signout', as: :signout
  get 'logout' => 'users#signout', as: :logout

  post 'restore' => 'users#restore', as: :restore
  get 'restore' => 'users#restore'

  # TODO: use this namespace and change urls in game
  # namespace :api do
  post 'login' => 'users#login', as: :login
  post 'flogin' => 'users#flogin', as: :flogin # facebook login
  get 'login' => 'users#login'
  post 'add' => 'users#add', as: :add
  post 'sub' => 'users#sub', as: :sub
  post 'get' => 'users#get_balance', as: :get_balance
  post 'set' => 'users#set_balance', as: :set_balance
  # end

  # social login
  get '/auth/:provider/callback', to: 'sessions#create'

  # end social login

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
