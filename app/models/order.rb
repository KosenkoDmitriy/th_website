class Order < ActiveRecord::Base
  belongs_to :user
  belongs_to :credit

  def purchase
    response = EXPRESS_GATEWAY.purchase(credit.cost_in_cents, express_purchase_options)
    credit.update_attribute(:dt, Time.now) if response.success?
    response.success?
  end

  def express_token=(token)
    self[:express_token] = token
    if new_record? && !token.blank?
      # you can dump details var if you need more info from buyer
      details = EXPRESS_GATEWAY.details_for(token)
      self.express_payer_id = details.payer_id
    end
  end

  private

  def express_purchase_options
    {
        :ip => ip,
        :token => express_token,
        :payer_id => express_payer_id
    }
  end
end
