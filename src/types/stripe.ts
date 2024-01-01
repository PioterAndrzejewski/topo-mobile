export interface ExternalAccountList {
  /**
   * The list contains all external accounts that have been attached to the Stripe account. These may be bank accounts or cards.
   */
  data: (Card | BankAccount)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface Account {
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A logo for this account (at least 128px x 128px)
   */
  business_logo?: string | FileUpload | null
  /**
   * The publicly visible name of the business
   */
  business_name?: string | null
  /**
   * The publicly visible website of the business
   */
  business_url?: string | null
  /**
   * Whether the account can create live charges
   */
  charges_enabled: boolean
  /**
   * The country of the account
   */
  country: string
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created?: number
  /**
   * A Boolean indicating if Stripe should try to reclaim negative balances from an attached bank account. See our [Understanding Connect Account Balances](/docs/connect/account-balances) documentation for details.
   */
  debit_negative_balances?: boolean | null
  /**
   * Account-level settings to automatically decline certain types of charges regardless of the decision of the card issuer
   */
  decline_charge_on?: AccountDeclineChargeOn | null
  /**
   * The currency this account has chosen to use as the default
   */
  default_currency: string
  /**
   * Whether account details have been submitted. Standard accounts cannot receive payouts before this is true.
   */
  details_submitted: boolean
  /**
   * The display name for this account. This is used on the Stripe Dashboard to differentiate between accounts.
   */
  display_name?: string | null
  /**
   * The primary user's email address.
   */
  email?: string | null
  /**
   * External accounts (bank accounts and debit cards) currently attached to this account
   */
  external_accounts?: ExternalAccountList
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Information about the legal entity itself, including about the associated account representative
   */
  legal_entity?: LegalEntity | null
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata?: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "account"
  /**
   * Details on when funds from charges are available, and when they are paid out to an external account. See our [Setting Bank and Debit Card Payouts](/docs/connect/bank-transfers#payout-information) documentation for details.
   */
  payout_schedule?: TransferSchedule | null
  /**
   * The text that appears on the bank account statement for payouts. If not set, this defaults to the platform's bank descriptor as set in the Dashboard.
   */
  payout_statement_descriptor?: string | null
  /**
   * Whether Stripe can send payouts to this account
   */
  payouts_enabled: boolean
  /**
   * Internal-only description of the product sold or service provided by the business. It's used by Stripe for risk and underwriting purposes.
   */
  product_description?: string | null
  /**
   * The default text that appears on credit card statements when a charge is made [directly on the account](/docs/connect/direct-charges)
   */
  statement_descriptor?: string | null
  /**
   * A publicly shareable support email address for the business
   */
  support_email?: string | null
  /**
   * A publicly shareable support phone number for the business
   */
  support_phone?: string | null
  /**
   * The timezone used in the Stripe Dashboard for this account. A list of possible time zone values is maintained at the [IANA Time Zone Database](http://www.iana.org/time-zones).
   */
  timezone?: string | null
  tos_acceptance?: AccountTosAcceptance
  /**
   * The Stripe account type. Can be `standard`, `express`, or `custom`.
   */
  type: string
  verification?: AccountVerification
}

export interface AccountDebitAccount {
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "account"
}

export interface AccountDeclineChargeOn {
  /**
   * Whether Stripe should automatically decline charges with an incorrect ZIP or postal code. This setting only applies when a ZIP or postal code is provided and the bank specifically marks it as failed.
   */
  avs_failure: boolean
  /**
   * Whether Stripe should automatically decline charges with an incorrect CVC. This setting only applies when a CVC is provided and the bank specifically marks it as failed.
   */
  cvc_failure: boolean
}

export interface AccountTosAcceptance {
  /**
   * The Unix timestamp marking when the Stripe Services Agreement was accepted by the account representative
   */
  date?: number | null
  /**
   * The IP address from which the Stripe Services Agreement was accepted by the account representative
   */
  ip?: string | null
  /**
   * The user agent of the browser from which the Stripe Services Agreement was accepted by the account representative
   */
  user_agent?: string | null
}

export interface AccountVerification {
  /**
   * A string describing the reason for this account being unable to create charges or receive payouts, if that is the case. Can be `rejected.fraud`, `rejected.terms_of_service`, `rejected.listed`, `rejected.other`, `fields_needed`, `listed`, `under_review`, or `other`.
   */
  disabled_reason?: string | null
  /**
   * By what time the `fields_needed` must be provided. If this date is in the past, the account is already in bad standing, and providing `fields_needed` is necessary to re-enable payouts and prevent other consequences. If this date is in the future, `fields_needed` must be provided to ensure the account remains in good standing.
   */
  due_by?: number | null
  /**
   * Field names that need to be provided for the account to remain in good standing. Nested fields are separated by `.` (for example, `legal_entity.first_name`).
   */
  fields_needed: any[]
}

export interface ExternalAccountList {
  /**
   * The list contains all external accounts that have been attached to the Stripe account. These may be bank accounts or cards.
   */
  data: (Card | BankAccount)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface AccountWithKeys {
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A logo for this account (at least 128px x 128px)
   */
  business_logo?: string | FileUpload | null
  /**
   * The publicly visible name of the business
   */
  business_name?: string | null
  /**
   * The publicly visible website of the business
   */
  business_url?: string | null
  /**
   * Whether the account can create live charges
   */
  charges_enabled: boolean
  /**
   * The country of the account
   */
  country: string
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created?: number
  /**
   * A Boolean indicating if Stripe should try to reclaim negative balances from an attached bank account. See our [Understanding Connect Account Balances](/docs/connect/account-balances) documentation for details.
   */
  debit_negative_balances?: boolean | null
  /**
   * Account-level settings to automatically decline certain types of charges regardless of the decision of the card issuer
   */
  decline_charge_on?: AccountDeclineChargeOn | null
  /**
   * The currency this account has chosen to use as the default
   */
  default_currency: string
  /**
   * Whether account details have been submitted. Standard accounts cannot receive payouts before this is true.
   */
  details_submitted: boolean
  /**
   * The display name for this account. This is used on the Stripe Dashboard to differentiate between accounts.
   */
  display_name?: string | null
  /**
   * The primary user's email address.
   */
  email?: string | null
  /**
   * External accounts (bank accounts and debit cards) currently attached to this account
   */
  external_accounts?: ExternalAccountList
  /**
   * Unique identifier for the object.
   */
  id: string
  keys: { [key: string]: string }
  /**
   * Information about the legal entity itself, including about the associated account representative
   */
  legal_entity?: LegalEntity | null
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata?: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "account"
  /**
   * Details on when funds from charges are available, and when they are paid out to an external account. See our [Setting Bank and Debit Card Payouts](/docs/connect/bank-transfers#payout-information) documentation for details.
   */
  payout_schedule?: TransferSchedule | null
  /**
   * The text that appears on the bank account statement for payouts. If not set, this defaults to the platform's bank descriptor as set in the Dashboard.
   */
  payout_statement_descriptor?: string | null
  /**
   * Whether Stripe can send payouts to this account
   */
  payouts_enabled: boolean
  /**
   * Internal-only description of the product sold or service provided by the business. It's used by Stripe for risk and underwriting purposes.
   */
  product_description?: string | null
  /**
   * The default text that appears on credit card statements when a charge is made [directly on the account](/docs/connect/direct-charges)
   */
  statement_descriptor?: string | null
  /**
   * A publicly shareable support email address for the business
   */
  support_email?: string | null
  /**
   * A publicly shareable support phone number for the business
   */
  support_phone?: string | null
  /**
   * The timezone used in the Stripe Dashboard for this account. A list of possible time zone values is maintained at the [IANA Time Zone Database](http://www.iana.org/time-zones).
   */
  timezone?: string | null
  tos_acceptance?: AccountTosAcceptance
  /**
   * The Stripe account type. Can be `standard`, `express`, or `custom`.
   */
  type: string
  verification?: AccountVerification
}

export interface Address {
  /**
   * City/District/Suburb/Town/Village.
   */
  city?: string | null
  /**
   * 2-letter country code.
   */
  country?: string | null
  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  line1?: string | null
  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  line2?: string | null
  /**
   * ZIP or postal code
   */
  postal_code?: string | null
  /**
   * State/County/Province/Region.
   */
  state?: string | null
}

export interface AlipayAccount {
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  customer?: string | Customer | DeletedCustomer | null
  /**
   * Uniquely identifies the account and will be the same across all Alipay account objects that are linked to the same Alipay account.
   */
  fingerprint: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata?: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "alipay_account"
  /**
   * If the Alipay account object is not reusable, the exact amount that you can create a charge for.
   */
  payment_amount?: number | null
  /**
   * If the Alipay account object is not reusable, the exact currency that you can create a charge for.
   */
  payment_currency?: string | null
  /**
   * True if you can create multiple payments using this account. If the account is reusable, then you can freely choose the amount of each payment.
   */
  reusable: boolean
  /**
   * Whether this Alipay account object has ever been used for a payment.
   */
  used: boolean
  /**
   * The username for the Alipay account.
   */
  username: string
}

export interface ApplePayDomain {
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  domain_name: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "apple_pay_domain"
}

export interface Application {
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The name of the application.
   */
  name?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "application"
}

export interface FeeRefundList {
  data: (FeeRefund)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface BackwardsCompatiblePlatformEarning {
  /**
   * ID of the Stripe account this fee was taken from.
   */
  account: string | Account
  /**
   * Amount earned, in %s.
   */
  amount: number
  /**
   * Amount in %s refunded (can be less than the amount attribute on the fee if a partial refund was issued)
   */
  amount_refunded: number
  /**
   * ID of the Connect application that earned the fee.
   */
  application: string | Application
  /**
   * Balance transaction that describes the impact of this collected application fee on your account balance (not including refunds).
   */
  balance_transaction: string | BalanceTransaction
  /**
   * ID of the charge that the application fee was taken from.
   */
  charge: string | Charge
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "application_fee"
  /**
   * ID of the corresponding charge on the platform account, if this fee was the result of a charge using the `destination` parameter.
   */
  originating_transaction?: string | Charge | Transfer | null
  /**
   * Whether the fee has been fully refunded. If the fee is only partially refunded, this attribute will still be false.
   */
  refunded: boolean
  /**
   * A list of refunds that have been applied to the fee.
   */
  refunds: FeeRefundList
}

export interface Balance {
  /**
   * Funds that are available to be paid out, whether automatically by Stripe or explicitly via the [transfers API](#transfers). The available balance for each currency and payment type can be found in the `source_types` property.
   */
  available: any[]
  /**
   * Funds held due to negative balances on connected Custom accounts. The connect reserve balance for each currency and payment type can be found in the `source_types` property.
   */
  connect_reserved?: any[]
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "balance"
  /**
   * Funds that are not yet available in the balance, due to the 7-day rolling pay cycle. The pending balance for each currency, and for each payment type, can be found in the `source_types` property.
   */
  pending: any[]
}

export interface BalanceTransaction {
  /**
   * Gross amount of the transaction, in %s.
   */
  amount: number
  /**
   * The date the transaction's net funds will become available in the Stripe balance.
   */
  available_on: number
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  exchange_rate?: number | null
  /**
   * Fees (in %s) paid for this transaction.
   */
  fee: number
  /**
   * Detailed breakdown of fees (in %s) paid for this transaction.
   */
  fee_details: (Fee)[]
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Net amount of the transaction, in %s.
   */
  net: number
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "balance_transaction"
  /**
   * The Stripe object to which this transaction is related.
   */
  source?: string | BitcoinTransaction | Charge | Dispute | FeeRefund | Payout | Transfer | TransferRecipientTransfer | PlatformFee | Refund | ReserveTransaction | TransferReversal | IssuingAuthorization | IssuingTransaction | ConnectCollectionTransfer | Topup | null
  /**
   * If the transaction's net funds are available in the Stripe balance yet. Either `available` or `pending`.
   */
  status: string
  /**
   * Transaction type: `adjustment`, `application_fee`, `application_fee_refund`, `charge`, `payment`, `payment_failure_refund`, `payment_refund`, `refund`, `transfer`, `transfer_refund`, `payout`, `payout_cancel`, `payout_failure`, `validation`, `stripe_fee`, or `network_cost`.
   */
  type: string
}

export interface BankAccount {
  account?: string | Account | null
  /**
   * The name of the person or business that owns the bank account.
   */
  account_holder_name?: string | null
  /**
   * The type of entity that holds the account. This can be either `individual` or `company`.
   */
  account_holder_type?: string | null
  /**
   * Name of the bank associated with the routing number (e.g., `WELLS FARGO`).
   */
  bank_name?: string | null
  /**
   * Two-letter ISO code representing the country the bank account is located in.
   */
  country: string
  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid out to the bank account.
   */
  currency: string
  customer?: string | Customer | DeletedCustomer | null
  /**
   * Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.
   */
  fingerprint?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  last4: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata?: { [key: string]: string } | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "bank_account"
  /**
   * The routing transit number for the bank account.
   */
  routing_number?: string | null
  /**
   * Possible values are `new`, `validated`, `verified`, `verification_failed`, or `errored`. A bank account that hasn't had any activity or validation performed is `new`. If Stripe can determine that the bank account exists, its status will be `validated`. Note that there often isn’t enough information to know (e.g., for smaller credit unions), and the validation is not always run. If customer bank account verification has succeeded, the bank account status will be `verified`. If the verification failed for any reason, such as microdeposit failure, the status will be `verification_failed`. If a transfer sent to this bank account fails, we'll set the status to `errored` and will not continue to send transfers until the bank details are updated.
   */
  status: string
}

export interface BitcoinTransactionList {
  data: (BitcoinTransaction)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface BitcoinReceiver {
  /**
   * True when this bitcoin receiver has received a non-zero amount of bitcoin.
   */
  active: boolean
  /**
   * The amount of `currency` that you are collecting as payment.
   */
  amount: number
  /**
   * The amount of `currency` to which `bitcoin_amount_received` has been converted.
   */
  amount_received: number
  /**
   * The amount of bitcoin that the customer should send to fill the receiver. The `bitcoin_amount` is denominated in Satoshi: there are 10^8 Satoshi in one bitcoin.
   */
  bitcoin_amount: number
  /**
   * The amount of bitcoin that has been sent by the customer to this receiver.
   */
  bitcoin_amount_received: number
  /**
   * This URI can be displayed to the customer as a clickable link (to activate their bitcoin client) or as a QR code (for mobile wallets).
   */
  bitcoin_uri: string
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) to which the bitcoin will be converted.
   */
  currency: string
  customer?: string | null
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * The customer's email address, set by the API call that creates the receiver.
   */
  email?: string | null
  /**
   * This flag is initially false and updates to true when the customer sends the `bitcoin_amount` to this receiver.
   */
  filled: boolean
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * A bitcoin address that is specific to this receiver. The customer can send bitcoin to this address to fill the receiver.
   */
  inbound_address: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "bitcoin_receiver"
  /**
   * The ID of the payment created from the receiver, if any. Hidden when viewing the receiver with a publishable key.
   */
  payment?: string | null
  refund_address?: string | null
  /**
   * A list with one entry for each time that the customer sent bitcoin to the receiver. Hidden when viewing the receiver with a publishable key.
   */
  transactions?: BitcoinTransactionList
  /**
   * This receiver contains uncaptured funds that can be used for a payment or refunded.
   */
  uncaptured_funds: boolean
  used_for_payment?: boolean | null
}

export interface BitcoinTransaction {
  /**
   * The amount of `currency` that the transaction was converted to in real-time.
   */
  amount: number
  /**
   * The amount of bitcoin contained in the transaction.
   */
  bitcoin_amount: number
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) to which this transaction was converted.
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "bitcoin_transaction"
  /**
   * The receiver to which this transaction was sent.
   */
  receiver: string
}

export interface Card {
  /**
   * The account this card belongs to. This attribute will not be in the card object if the card belongs to a customer or recipient instead.
   */
  account?: string | Account | null
  /**
   * City/District/Suburb/Town/Village.
   */
  address_city?: string | null
  /**
   * Billing address country, if provided when creating card.
   */
  address_country?: string | null
  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  address_line1?: string | null
  /**
   * If `address_line1` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  address_line1_check?: string | null
  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  address_line2?: string | null
  /**
   * State/County/Province/Region.
   */
  address_state?: string | null
  /**
   * ZIP or postal code.
   */
  address_zip?: string | null
  /**
   * If `address_zip` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  address_zip_check?: string | null
  /**
   * A set of available payout methods for this card. Will be either `["standard"]` or `["standard", "instant"]`. Only values from this set should be passed as the `method` when creating a transfer.
   */
  available_payout_methods?: (string)[] | null
  /**
   * Card brand. Can be `American Express`, `Diners Club`, `Discover`, `JCB`, `MasterCard`, `UnionPay`, `Visa`, or `Unknown`.
   */
  brand: string
  /**
   * Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you've collected.
   */
  country?: string | null
  /**
   * Three-letter [ISO code for currency](https://stripe.com/docs/payouts). Only applicable on accounts (not customers or recipients). The card can be used as a transfer destination for funds in this currency.
   */
  currency?: string | null
  /**
   * The customer that this card belongs to. This attribute will not be in the card object if the card belongs to an account or recipient instead.
   */
  customer?: string | Customer | DeletedCustomer | null
  /**
   * If a CVC was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  cvc_check?: string | null
  /**
   * Only applicable on accounts (not customers or recipients). This indicates whether this card is the default external account for its currency.
   */
  default_for_currency?: boolean | null
  /**
   * (For tokenized numbers only.) The last four digits of the device account number.
   */
  dynamic_last4?: string | null
  /**
   * Two-digit number representing the card's expiration month.
   */
  exp_month: number
  /**
   * Four-digit number representing the card's expiration year.
   */
  exp_year: number
  /**
   * Uniquely identifies this particular card number. You can use this attribute to check whether two customers who've signed up with you are using the same card number, for example.
   */
  fingerprint?: string | null
  /**
   * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
   */
  funding: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The last four digits of the card.
   */
  last4: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * Cardholder name.
   */
  name?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "card"
  /**
   * The recipient that this card belongs to. This attribute will not be in the card object if the card belongs to a customer or account instead.
   */
  recipient?: string | TransferRecipient | null
  /**
   * If the card number is tokenized, this is the method that was used. Can be `apple_pay` or `android_pay`.
   */
  tokenization_method?: string | null
}

export interface RefundList {
  data: (Refund)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface Charge {
  /**
   * A positive integer in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency) representing how much to charge. The minimum amount is $0.50 US or [equivalent in charge currency](https://support.stripe.com/questions/what-is-the-minimum-amount-i-can-charge-with-stripe).
   */
  amount: number
  /**
   * Amount in %s refunded (can be less than the amount attribute on the charge if a partial refund was issued).
   */
  amount_refunded: number
  /**
   * ID of the Connect application that created the charge.
   */
  application?: string | Application | null
  /**
   * The application fee (if any) for the charge. [See the Connect documentation](/docs/connect/direct-charges#collecting-fees) for details.
   */
  application_fee?: string | BackwardsCompatiblePlatformEarning | PlatformFee | null
  /**
   * ID of the balance transaction that describes the impact of this charge on your account balance (not including refunds or disputes).
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * If the charge was created without capturing, this Boolean represents whether it is still uncaptured or has since been captured.
   */
  captured: boolean
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * ID of the customer this charge is for if one exists.
   */
  customer?: string | Customer | DeletedCustomer | null
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * The account (if any) the charge was made on behalf of, with an automatic transfer. [See the Connect documentation](/docs/connect/destination-charges) for details.
   */
  destination?: string | Account | null
  /**
   * Details about the dispute if the charge has been disputed.
   */
  dispute?: string | Dispute | null
  /**
   * Error code explaining reason for charge failure if available (see [the errors section](/docs/api#errors) for a list of codes).
   */
  failure_code?: string | null
  /**
   * Message to user further explaining reason for charge failure if available.
   */
  failure_message?: string | null
  /**
   * Hash with information on fraud assessments for the charge. Assessments reported by you have the key `user_report` and, if set, possible values of `safe` and `fraudulent`. Assessments from Stripe have the key `stripe_report` and, if set, the value `fraudulent`.
   */
  fraud_details?: { [key: string]: string } | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * ID of the invoice this charge is for if one exists.
   */
  invoice?: string | Invoice | null
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "charge"
  /**
   * The account (if any) the charge was made on behalf of without triggering an automatic transfer. See the [Connect documentation](/docs/connect/charges-transfers) for details.
   */
  on_behalf_of?: string | Account | null
  /**
   * ID of the order this charge is for if one exists.
   */
  order?: string | Order | null
  /**
   * Details about whether the payment was accepted, and why. See [understanding declines](/docs/declines) for details.
   */
  outcome?: ChargeOutcome | null
  /**
   * `true` if the charge succeeded, or was successfully authorized for later capture.
   */
  paid: boolean
  /**
   * This is the email address that the receipt for this charge was sent to.
   */
  receipt_email?: string | null
  /**
   * This is the transaction number that appears on email receipts sent for this charge. This attribute will be `null` until a receipt has been sent.
   */
  receipt_number?: string | null
  /**
   * Whether the charge has been fully refunded. If the charge is only partially refunded, this attribute will still be false.
   */
  refunded: boolean
  /**
   * A list of refunds that have been applied to the charge.
   */
  refunds: RefundList
  /**
   * ID of the review associated with this charge if one exists.
   */
  review?: string | RadarReview | null
  /**
   * Shipping information for the charge.
   */
  shipping?: Shipping | null
  /**
   * For most Stripe users, the source of every charge is a credit or debit card. This hash is then the [card object](#card_object) describing that card.
   */
  source: AccountDebitAccount | AlipayAccount | BankAccount | BitcoinReceiver | Card | LimitedAccount | Source
  /**
   * The transfer ID which created this charge. Only present if the charge came from another Stripe account. [See the Connect documentation](/docs/connect/destination-charges) for details.
   */
  source_transfer?: string | Transfer | null
  /**
   * Extra information about a charge. This will appear on your customer's credit card statement. It must contain at least one letter.
   */
  statement_descriptor?: string | null
  /**
   * The status of the payment is either `succeeded`, `pending`, or `failed`.
   */
  status: string
  /**
   * ID of the transfer to the `destination` account (only applicable if the charge was created using the `destination` parameter).
   */
  transfer?: string | Transfer
  /**
   * A string that identifies this transaction as part of a group. See the [Connect documentation](/docs/connect/charges-transfers#grouping-transactions) for details.
   */
  transfer_group?: string | null
}

export interface ChargeOutcome {
  /**
   * Possible values are `approved_by_network`, `declined_by_network`, `not_sent_to_network`, and `reversed_after_approval`. The value `reversed_after_approval` indicates the payment was [blocked by Stripe](/docs/declines#blocked-payments) after bank authorization, and may temporarily appear as "pending" on a cardholder's statement.
   */
  network_status?: string | null
  /**
   * An enumerated value providing a more detailed explanation of the outcome's `type`. Charges blocked by Radar's default block rule have the value `highest_risk_level`. Charges placed in review by Radar's default review rule have the value `elevated_risk_level`. Charges authorized, blocked, or placed in review by custom rules have the value `rule`. See [understanding declines](/docs/declines) for more details.
   */
  reason?: string | null
  /**
   * Stripe's evaluation of the riskiness of the payment. Possible values for evaluated payments are `normal`, `elevated`, `highest`. For non-card payments, and card-based payments predating the public assignment of risk levels, this field will have the value `not_assessed`. In the event of an error in the evaluation, this field will have the value `unknown`.
   */
  risk_level?: string
  /**
   * Stripe's evaluation of the riskiness of the payment. Possible values for evaluated payments are between 0 and 100. For non-card payments, card-based payments predating the public assignment of risk scores, or in the event of an error during evaluation, this field will not be present. This field is only available with Radar for Fraud Teams.
   */
  risk_score?: number
  /**
   * The ID of the Radar rule that matched the payment, if applicable.
   */
  rule?: string | RadarRule
  /**
   * A human-readable description of the outcome type and reason, designed for you (the recipient of the payment), not your customer.
   */
  seller_message?: string | null
  /**
   * Possible values are `authorized`, `manual_review`, `issuer_declined`, `blocked`, and `invalid`. See [understanding declines](/docs/declines) and [Radar reviews](radar/review) for details.
   */
  type: string
}

export interface ConnectCollectionTransfer {
  /**
   * Amount transferred, in %s.
   */
  amount: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * ID of the account that funds are being collected for.
   */
  destination: string | Account
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "connect_collection_transfer"
}

export interface CountrySpec {
  /**
   * The default currency for this country. This applies to both payment methods and bank accounts.
   */
  default_currency: string
  /**
   * Unique identifier for the object. Represented as the ISO country code for this country.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "country_spec"
  /**
   * Currencies that can be accepted in the specific country (for transfers).
   */
  supported_bank_account_currencies: { [key: string]: string }
  /**
   * Currencies that can be accepted in the specified country (for payments).
   */
  supported_payment_currencies: (string)[]
  /**
   * Payment methods available in the specified country. You may need to enable some payment methods (e.g., [ACH](https://stripe.com/docs/ach)) on your account before they appear in this list. The `stripe` payment method refers to [charging through your platform](https://stripe.com/docs/connect/destination-charges).
   */
  supported_payment_methods: (string)[]
  /**
   * Countries that can accept transfers from the specified country.
   */
  supported_transfer_countries: (string)[]
  /**
   * Lists the types of verification data needed to keep an account open. Includes 'minimum' fields, which every account must eventually provide, as well as a 'additional' fields, which are only required for some users.
   */
  verification_fields: { [key: string]: string }
}

export interface Coupon {
  /**
   * Amount (in the `currency` specified) that will be taken off the subtotal of any invoices for this customer.
   */
  amount_off?: number | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * If `amount_off` has been set, the three-letter [ISO code for the currency](https://stripe.com/docs/currencies) of the amount to take off.
   */
  currency?: string | null
  /**
   * One of `forever`, `once`, and `repeating`. Describes how long a customer who applies this coupon will get the discount.
   */
  duration: "forever" | "once" | "repeating"
  /**
   * If `duration` is `repeating`, the number of months the coupon applies. Null if coupon `duration` is `forever` or `once`.
   */
  duration_in_months?: number | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Maximum number of times this coupon can be redeemed, in total, before it is no longer valid.
   */
  max_redemptions?: number | null
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * Name of the coupon displayed to customers on for instance invoices or receipts.
   */
  name?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "coupon"
  /**
   * Percent that will be taken off the subtotal of any invoices for this customer for the duration of the coupon. For example, a coupon with percent_off of 50 will make a %s100 invoice %s50 instead.
   */
  percent_off?: number | null
  /**
   * A percise version of `percent_off` that shows floating point values.
   */
  percent_off_precise?: number | null
  /**
   * Date after which the coupon can no longer be redeemed.
   */
  redeem_by?: number | null
  /**
   * Number of times this coupon has been applied to a customer.
   */
  times_redeemed: number
  /**
   * Taking account of the above properties, whether this coupon can still be applied to a customer.
   */
  valid: boolean
}

export interface ApmsSourcesSourceList {
  /**
   * The list contains all payment sources that have been attached to the customer.
   */
  data: (AccountDebitAccount | AlipayAccount | BankAccount | BitcoinReceiver | Card | Source)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface SubscriptionList {
  data: (Subscription)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface Customer {
  /**
   * Current balance, if any, being stored on the customer's account. If negative, the customer has credit to apply to the next invoice. If positive, the customer has an amount owed that will be added to the next invoice. The balance does not refer to any unpaid invoices; it solely takes into account amounts that have yet to be successfully applied to any invoice. This balance is only taken into account for recurring billing purposes (i.e., subscriptions, invoices, invoice items).
   */
  account_balance?: number
  /**
   * The customer's VAT identification number. Appears on invoices emailed to this customer.
   */
  business_vat_id?: string
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) the customer can be charged in for recurring billing purposes.
   */
  currency?: string | null
  /**
   * ID of the default source attached to this customer.
   */
  default_source?: string | AccountDebitAccount | AlipayAccount | BankAccount | BitcoinReceiver | Card | Source | null
  /**
   * When the customer's latest invoice is billed by charging automatically, delinquent is true if the invoice's latest charge is failed. When the customer's latest invoice is billed by sending an invoice, delinquent is true if the invoice is not paid by its due date.
   */
  delinquent?: boolean | null
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * Describes the current discount active on the customer, if there is one.
   */
  discount?: Discount | null
  /**
   * The customer's email address.
   */
  email?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The prefix for the customer used to generate unique invoice numbers.
   */
  invoice_prefix?: string | null
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata?: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "customer"
  /**
   * Mailing and shipping address for the customer. Appears on invoices emailed to this customer.
   */
  shipping?: CustomerShipping | null
  /**
   * The customer's payment sources, if any.
   */
  sources: ApmsSourcesSourceList
  /**
   * The customer's current subscriptions, if any.
   */
  subscriptions?: SubscriptionList
}

export interface CustomerShipping {
  address: Address
  /**
   * Customer name.
   */
  name: string
  /**
   * Customer phone (including extension).
   */
  phone?: string | null
}

type CustomerSource = BankAccount | AlipayAccount | BitcoinReceiver | BankAccount | Card | Source

type CustomerSourceCreate = BankAccount | Card | Source

export interface DeletedAccount {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "account"
}

export interface DeletedApplePayDomain {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "apple_pay_domain"
}

export interface DeletedBankAccount {
  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid out to the bank account.
   */
  currency?: string | null
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "bank_account"
}

export interface DeletedCard {
  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid out to the bank account.
   */
  currency?: string | null
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "card"
}

export interface DeletedCoupon {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "coupon"
}

export interface DeletedCustomer {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "customer"
}

export interface DeletedDiscount {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "discount"
}

export interface DeletedObject {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
}

export interface DeletedPlan {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "plan"
}

export interface DeletedProduct {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "product"
}

export interface DeletedSku {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "sku"
}

export interface DeletedSubscriptionItem {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "subscription_item"
}

export interface DeletedTaxRateTemplate {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "tax_rate_template"
}

export interface DeletedTransferRecipient {
  /**
   * Always true for a deleted object
   */
  deleted: true
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "recipient"
}

export interface DeliveryEstimate {
  /**
   * If `type` is `"exact"`, `date` will be the expected delivery date in the format YYYY-MM-DD.
   */
  date?: string
  /**
   * If `type` is `"range"`, `earliest` will be be the earliest delivery date in the format YYYY-MM-DD.
   */
  earliest?: string
  /**
   * If `type` is `"range"`, `latest` will be the latest delivery date in the format YYYY-MM-DD.
   */
  latest?: string
  /**
   * The type of estimate. Must be either `"range"` or `"exact"`.
   */
  type: string
}

export interface Discount {
  coupon: Coupon
  customer?: string | Customer | DeletedCustomer | null
  /**
   * If the coupon has a duration of `repeating`, the date that this discount will end. If the coupon has a duration of `once` or `forever`, this attribute will be null.
   */
  end?: number | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "discount"
  /**
   * Date that the coupon was applied.
   */
  start: number
  /**
   * The subscription that this coupon is applied to, if it is applied to a particular subscription.
   */
  subscription?: string | null
}

export interface Dispute {
  /**
   * Disputed amount. Usually the amount of the charge, but can differ (usually because of currency fluctuation or because only part of the order is disputed).
   */
  amount: number
  /**
   * List of zero, one, or two balance transactions that show funds withdrawn and reinstated to your Stripe account as a result of this dispute.
   */
  balance_transactions: (BalanceTransaction)[]
  /**
   * ID of the charge that was disputed.
   */
  charge: string | Charge
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  evidence: DisputeEvidence
  evidence_details: DisputeEvidenceDetails
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * If true, it is still possible to refund the disputed payment. Once the payment has been fully refunded, no further funds will be withdrawn from your Stripe account as a result of this dispute.
   */
  is_charge_refundable: boolean
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "dispute"
  /**
   * Reason given by cardholder for dispute. Possible values are `duplicate`, `fraudulent`, `subscription_canceled`, `product_unacceptable`, `product_not_received`, `unrecognized`, `credit_not_processed`, `general`, `incorrect_account_details`, `insufficient_funds`, `bank_cannot_process`, `debit_not_authorized`, or `customer_initiated`. Read more about [dispute reasons](/docs/disputes/categories).
   */
  reason: string
  /**
   * Current status of dispute. Possible values are `warning_needs_response`, `warning_under_review`, `warning_closed`, `needs_response`, `under_review`, `charge_refunded`, `won`, or `lost`.
   */
  status: "charge_refunded" | "lost" | "needs_response" | "under_review" | "warning_closed" | "warning_needs_response" | "warning_under_review" | "won"
}

export interface DisputeEvidence {
  /**
   * Any server or activity logs showing proof that the customer accessed or downloaded the purchased digital product. This information should include IP addresses, corresponding timestamps, and any detailed recorded activity.
   */
  access_activity_log?: string | null
  /**
   * The billing address provided by the customer.
   */
  billing_address?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Your subscription cancellation policy, as shown to the customer.
   */
  cancellation_policy?: string | FileUpload | null
  /**
   * An explanation of how and when the customer was shown your refund policy prior to purchase.
   */
  cancellation_policy_disclosure?: string | null
  /**
   * A justification for why the customer's subscription was not canceled.
   */
  cancellation_rebuttal?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any communication with the customer that you feel is relevant to your case. Examples include emails proving that the customer received the product or service, or demonstrating their use of or satisfaction with the product or service.
   */
  customer_communication?: string | FileUpload | null
  /**
   * The email address of the customer.
   */
  customer_email_address?: string | null
  /**
   * The name of the customer.
   */
  customer_name?: string | null
  /**
   * The IP address that the customer used when making the purchase.
   */
  customer_purchase_ip?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A relevant document or contract showing the customer's signature.
   */
  customer_signature?: string | FileUpload | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Documentation for the prior charge that can uniquely identify the charge, such as a receipt, shipping label, work order, etc. This document should be paired with a similar document from the disputed payment that proves the two payments are separate.
   */
  duplicate_charge_documentation?: string | FileUpload | null
  /**
   * An explanation of the difference between the disputed charge versus the prior charge that appears to be a duplicate.
   */
  duplicate_charge_explanation?: string | null
  /**
   * The Stripe ID for the prior charge which appears to be a duplicate of the disputed charge.
   */
  duplicate_charge_id?: string | null
  /**
   * A description of the product or service that was sold.
   */
  product_description?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any receipt or message sent to the customer notifying them of the charge.
   */
  receipt?: string | FileUpload | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Your refund policy, as shown to the customer.
   */
  refund_policy?: string | FileUpload | null
  /**
   * Documentation demonstrating that the customer was shown your refund policy prior to purchase.
   */
  refund_policy_disclosure?: string | null
  /**
   * A justification for why the customer is not entitled to a refund.
   */
  refund_refusal_explanation?: string | null
  /**
   * The date on which the customer received or began receiving the purchased service, in a clear human-readable format.
   */
  service_date?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Documentation showing proof that a service was provided to the customer. This could include a copy of a signed contract, work order, or other form of written agreement.
   */
  service_documentation?: string | FileUpload | null
  /**
   * The address to which a physical product was shipped. You should try to include as complete address information as possible.
   */
  shipping_address?: string | null
  /**
   * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc. If multiple carriers were used for this purchase, please separate them with commas.
   */
  shipping_carrier?: string | null
  /**
   * The date on which a physical product began its route to the shipping address, in a clear human-readable format.
   */
  shipping_date?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Documentation showing proof that a product was shipped to the customer at the same address the customer provided to you. This could include a copy of the shipment receipt, shipping label, etc. It should show the customer's full shipping address, if possible.
   */
  shipping_documentation?: string | FileUpload | null
  /**
   * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
   */
  shipping_tracking_number?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any additional evidence or statements.
   */
  uncategorized_file?: string | FileUpload | null
  /**
   * Any additional evidence or statements.
   */
  uncategorized_text?: string | null
}

export interface DisputeEvidenceDetails {
  /**
   * Date by which evidence must be submitted in order to successfully challenge dispute. Will be null if the customer's bank or credit card company doesn't allow a response for this particular dispute.
   */
  due_by?: number | null
  /**
   * Whether evidence has been staged for this dispute.
   */
  has_evidence: boolean
  /**
   * Whether the last evidence submission was submitted past the due date. Defaults to `false` if no evidence submissions have occurred. If `true`, then delivery of the latest evidence is *not* guaranteed.
   */
  past_due: boolean
  /**
   * The number of times evidence has been submitted. Typically, you may only submit evidence once.
   */
  submission_count: number
}

export interface EphemeralKey {
  secret: string;
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Time at which the key will expire. Measured in seconds since the Unix epoch.
   */
  expires: number
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "ephemeral_key"
}

export interface EphemeralKeyWithSecret {
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Time at which the key will expire. Measured in seconds since the Unix epoch.
   */
  expires: number
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "ephemeral_key"
  /**
   * The key's secret. You can use this value to make authorized requests to the Stripe API.
   */
  secret: string
}

export interface ExchangeRate {
  /**
   * Unique identifier for the object. Represented as the three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) in lowercase.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "exchange_rate"
  /**
   * Hash where the keys are supported currencies and the values are the exchange rate at which the base id currency converts to the key currency.
   */
  rates: { [key: string]: string }
}

type ExternalAccountSource = BankAccount | Card

export interface Fee {
  /**
   * Amount of the fee, in cents.
   */
  amount: number
  application?: string | null
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * Type of the fee, one of: `application_fee`, `stripe_fee` or `tax`.
   */
  type: string
}

export interface FeeRefund {
  /**
   * Amount, in %s.
   */
  amount: number
  /**
   * Balance transaction that describes the impact on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * ID of the application fee that was refunded.
   */
  fee: string | PlatformFee
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "fee_refund"
}

export interface File {
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * A filename for the file, suitable for saving to a filesystem.
   */
  filename?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "file"
  /**
   * The purpose of the file. Possible values are `finance_report_run`, `founders_stock_document`, or `sigma_scheduled_query`.
   */
  purpose: string
  /**
   * The size in bytes of the file object.
   */
  size: number
  /**
   * A user friendly title for the document.
   */
  title?: string | null
  /**
   * The type of the file returned (e.g., `csv`, `pdf`, `jpg`, or `png`).
   */
  type?: string | null
  /**
   * The URL from which the file can be downloaded using your live secret API key.
   */
  url?: string | null
}

export interface FileUpload {
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * A filename for the file, suitable for saving to a filesystem.
   */
  filename?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "file_upload"
  /**
   * The purpose of the uploaded file. Possible values are `business_logo`, `customer_signature`, `dispute_evidence`, `identity_document`, `pci_document`, or `tax_document_user_upload`.
   */
  purpose: string
  /**
   * The size in bytes of the file upload object.
   */
  size: number
  /**
   * The type of the file returned. Returns one of the following: `csv`, `docx`, `gif`, `jpg`, `pdf`, `png`, `xls`, or `xlsx`.
   */
  type?: string | null
  /**
   * A read-only URL where the uploaded file can be accessed. Will be nil if the purpose of the uploaded file is `identity_document`. Also nil if retrieved with the publishable API key.
   */
  url?: string | null
}

export interface FinancialReportingFinanceReportRunRunParameters {
  /**
   * Connected account ID by which to filter the report run.
   */
  connected_account?: string
  /**
   * Currency of objects to be included in the report run.
   */
  currency?: string
  /**
   * Ending timestamp of data to be included in the report run (exclusive).
   */
  interval_end?: number
  /**
   * Starting timestamp of data to be included in the report run.
   */
  interval_start?: number
  /**
   * Payout ID by which to filter the report run.
   */
  payout?: string
  /**
   * Category of balance transactions to be included in the report run.
   */
  reporting_category?: string
}

export interface Inventory {
  /**
   * The count of inventory available. Will be present if and only if `type` is `finite`.
   */
  quantity?: number | null
  /**
   * Inventory type. Possible values are `finite`, `bucket` (not quantified), and `infinite`.
   */
  type: string
  /**
   * An indicator of the inventory available. Possible values are `in_stock`, `limited`, and `out_of_stock`. Will be present if and only if `type` is `bucket`.
   */
  value?: string | null
}

export interface InvoiceLinesList {
  data: (InvoiceLineItem)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface Invoice {
  /**
   * Final amount due at this time for this invoice. If the invoice's total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`.
   */
  amount_due: number
  /**
   * The amount, in %s, that was paid.
   */
  amount_paid: number
  /**
   * The amount remaining, in %s, that is due.
   */
  amount_remaining: number
  /**
   * The fee in %s that will be applied to the invoice and transferred to the application owner's Stripe account when the invoice is paid.
   */
  application_fee?: number | null
  /**
   * Number of payment attempts made for this invoice, from the perspective of the payment retry schedule. Any payment attempt counts as the first attempt, and subsequently only automatic retries increment the attempt count. In other words, manual payment attempts after the first attempt do not affect the retry schedule.
   */
  attempt_count: number
  /**
   * Whether an attempt has been made to pay the invoice. An invoice is not attempted until 1 hour after the `invoice.created` webhook, for example, so you might not want to display that invoice as unpaid to your users.
   */
  attempted: boolean
  /**
   * When set to false the Invoice will not attempt to advance itself in collecting payment, so won't send emails, run smart dunning, or automatically issue a draft invoice.
   */
  auto_advance: boolean
  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this invoice using the default source attached to the customer. When sending an invoice, Stripe will email this invoice to the customer with payment instructions.
   */
  billing?: "charge_automatically" | "send_invoice" | null
  /**
   * Indicates the reason why the invoice was created. `subscription_cycle` indicates an invoice created by a subscription advancing into a new period. `subscription_update` indicates an invoice created due to creating or updating a subscription. `subscription` is set for all old invoices to indicate either a change to a subscription or a period advancement. `manual` is set for all invoices unrelated to a subscription (for example: created via the invoice editor). The `upcoming` value is reserved for simulated invoices per the upcoming invoice endpoint.
   */
  billing_reason?: "manual" | "subscription" | "subscription_cycle" | "subscription_threshold" | "subscription_update" | "upcoming" | null
  /**
   * ID of the latest charge generated for this invoice, if any.
   */
  charge?: string | Charge | null
  /**
   * Whether the invoice is still trying to collect payment. An invoice is closed if it's either paid or it has been marked closed. A closed invoice will no longer attempt to collect payment.
   */
  closed: boolean
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  customer: string | Customer | DeletedCustomer
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  date: number
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  discount?: Discount | null
  /**
   * The date on which payment for this invoice is due. This value will be `null` for invoices where `billing=charge_automatically`.
   */
  due_date?: number | null
  /**
   * Ending customer balance after the invoice is frozen. Invoices are frozen approximately an hour after successful webhook delivery or when payment collection is attempted for the invoice. If the invoice has not been frozen yet, this will be null.
   */
  ending_balance?: number | null
  /**
   * Whether the invoice has been forgiven. Forgiving an invoice instructs us to update the subscription status as if the invoice were successfully paid. Once an invoice has been forgiven, it cannot be unforgiven or reopened.
   */
  forgiven: boolean
  /**
   * The URL for the hosted invoice page, which allows customers to view and pay an invoice. If the invoice has not been frozen yet, this will be null.
   */
  hosted_invoice_url?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The link to download the PDF for the invoice. If the invoice has not been frozen yet, this will be null.
   */
  invoice_pdf?: string | null
  /**
   * The individual line items that make up the invoice. `lines` is sorted as follows: invoice items in reverse chronological order, followed by the subscription, if any.
   */
  lines: InvoiceLinesList
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata?: { [key: string]: string } | null
  /**
   * The time at which payment will next be attempted. This value will be `null` for invoices where `billing=send_invoice`.
   */
  next_payment_attempt?: number | null
  /**
   * A unique, identifying string that appears on emails sent to the customer for this invoice. This starts with the customer's unique invoice_prefix if it is specified.
   */
  number?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "invoice"
  /**
   * Whether payment was successfully collected for this invoice. An invoice can be paid (most commonly) with a charge or with credit from the customer's account balance.
   */
  paid: boolean
  /**
   * End of the usage period during which invoice items were added to this invoice.
   */
  period_end: number
  /**
   * Start of the usage period during which invoice items were added to this invoice.
   */
  period_start: number
  /**
   * This is the transaction number that appears on email receipts sent for this invoice.
   */
  receipt_number?: string | null
  /**
   * Starting customer balance before the invoice is frozen. If the invoice has not been frozen yet, this will be the current customer balance.
   */
  starting_balance: number
  /**
   * Extra information about an invoice for the customer's credit card statement.
   */
  statement_descriptor?: string | null
  /**
   * The subscription that this invoice was prepared for, if any.
   */
  subscription?: string | Subscription | null
  /**
   * Only set for upcoming invoices that preview prorations. The time used to calculate prorations.
   */
  subscription_proration_date?: number
  /**
   * Total of all subscriptions, invoice items, and prorations on the invoice before any discount is applied.
   */
  subtotal: number
  /**
   * The amount of tax included in the total, calculated from `tax_percent` and the subtotal. If no `tax_percent` is defined, this value will be null.
   */
  tax?: number | null
  /**
   * This percentage of the subtotal has been added to the total amount of the invoice, including invoice line items and discounts. This field is inherited from the subscription's `tax_percent` field, but can be changed before the invoice is paid. This field defaults to null.
   */
  tax_percent?: number | null
  /**
   * Total after discount.
   */
  total: number
  /**
   * The time at which webhooks for this invoice were successfully delivered (if the invoice had no webhooks to deliver, this will match `date`). Invoice payment is delayed until webhooks are delivered, or until all webhook delivery attempts have been exhausted.
   */
  webhooks_delivered_at?: number | null
}

export interface InvoiceItem {
  /**
   * Amount (in the `currency` specified) of the invoice item. This should always be equal to `unit_amount * quantity`.
   */
  amount: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * The ID of the customer who will be billed when this invoice item is billed.
   */
  customer: string | Customer | DeletedCustomer
  date: number
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * If true, discounts will apply to this invoice item. Always false for prorations.
   */
  discountable: boolean
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The ID of the invoice this invoice item belongs to.
   */
  invoice?: string | Invoice | null
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "invoiceitem"
  period?: { [key: string]: string } | null
  /**
   * If the invoice item is a proration, the plan of the subscription that the proration was computed for.
   */
  plan?: Plan | null
  /**
   * Whether the invoice item was created automatically as a proration adjustment when the customer switched plans.
   */
  proration: boolean
  /**
   * Quantity of units for the invoice item. If the invoice item is a proration, the quantity of the subscription that the proration was computed for.
   */
  quantity: number
  /**
   * The subscription that this invoice item has been created for, if any.
   */
  subscription?: string | Subscription | null
  subscription_item?: string
  /**
   * Unit Amount (in the `currency` specified) of the invoice item.
   */
  unit_amount: number
}

export interface InvoiceLineItem {
  /**
   * The amount, in %s.
   */
  amount: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * If true, discounts will apply to this line item. Always false for prorations.
   */
  discountable: boolean
  /**
   * Unique identifier for the object.
   */
  id: string
  invoice_item?: string
  /**
   * Whether this is a test line item.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "line_item"
  period: InvoiceLineItemPeriod
  /**
   * The plan of the subscription, if the line item is a subscription or a proration.
   */
  plan?: Plan | null
  /**
   * Whether this is a proration.
   */
  proration: boolean
  /**
   * The quantity of the subscription, if the line item is a subscription or a proration.
   */
  quantity?: number | null
  /**
   * The subscription that the invoice item pertains to, if any.
   */
  subscription?: string | null
  /**
   * The subscription item that generated this invoice item. Left empty if the line item is not an explicit result of a subscription.
   */
  subscription_item?: string
  /**
   * A string identifying the type of the source of this line item, either an `invoiceitem` or a `subscription`.
   */
  type: "invoiceitem" | "subscription"
}

export interface InvoiceLineItemPeriod {
  /**
   * End of the line item's billing period
   */
  end: number
  /**
   * Start of the line item's billing period
   */
  start: number
}

export interface IssuerFraudRecord {
  /**
   * ID of the charge this issuer fraud record is for, optionally expanded.
   */
  charge: string | Charge
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * The type of fraud labelled by the issuer. One of `card_never_received`, `fraudulent_card_application`, `made_with_counterfeit_card`, `made_with_lost_card`, `made_with_stolen_card`, `misc`, `unauthorized_use_of_card`.
   */
  fraud_type: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "issuer_fraud_record"
  /**
   * The timestamp at which the card issuer posted the issuer fraud record.
   */
  post_date: number
}

export interface IssuingAuthorization {
  /**
   * Whether the authorization has been approved.
   */
  approved: boolean
  /**
   * How the card details were provided. One of `keyed_in`, `swipe`, `chip`, `contactless`, or `online`.
   */
  authorization_method: string
  /**
   * The amount that has been authorized. This will be 0 when the object is created, and increase after it has been approved.
   */
  authorized_amount: number
  /**
   * The currency that was presented to the cardholder for the authorization. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  authorized_currency: string
  balance_transactions: (BalanceTransaction)[]
  card: IssuingCard
  /**
   * The cardholder to whom this authorization belongs.
   */
  cardholder?: string | IssuingCardholder | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * The amount Stripe has held from your account to fund the authorization. This will be 0 when the object is created, and increase after it has been approved.
   */
  held_amount: number
  /**
   * The currency of the [held amount](/docs/api#issuing_authorization_object-held_amount)
   */
  held_currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  is_held_amount_controllable: boolean
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  merchant_data: IssuingAuthorizationMerchantData
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "issuing.authorization"
  /**
   * The amount the user is requesting to be authorized. This field will only be non-zero during an `issuing.authorization.request` webhook.
   */
  pending_authorized_amount: number
  /**
   * The additional amount Stripe will hold if the authorization is approved. This field will only be non-zero during an `issuing.authorization.request` webhook.
   */
  pending_held_amount: number
  request_history: (IssuingAuthorizationRequest)[]
  /**
   * One of `pending`, `reversed`, or `closed`.
   */
  status: string
  transactions: (IssuingTransaction)[]
  verification_data: IssuingAuthorizationVerificationData
}

export interface IssuingAuthorizationMerchantData {
  /**
   * A categorization of the seller's type of business. See our [merchant categories guide](/docs/issuing/merchant-categories) for a list of possible values.
   */
  category: string
  /**
   * City where the seller is located
   */
  city?: string | null
  /**
   * Country where the seller is located
   */
  country?: string | null
  /**
   * Name of the seller
   */
  name?: string | null
  /**
   * Identifier assigned to the seller by the card brand
   */
  network_id: string
  /**
   * Postal code where the seller is located
   */
  postal_code?: string | null
  /**
   * State where the seller is located
   */
  state?: string | null
}

export interface IssuingAuthorizationRequest {
  /**
   * Whether this request was approved.
   */
  approved: boolean
  /**
   * The amount that was authorized at the time of this request
   */
  authorized_amount: number
  /**
   * The currency that was presented to the cardholder for the authorization. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  authorized_currency: string
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * The amount Stripe held from your account to fund the authorization, if the request was approved
   */
  held_amount: number
  /**
   * The currency of the [held amount](/docs/api#issuing_authorization_object-held_amount)
   */
  held_currency: string
  /**
   * One of `card_inactive`, `insufficient_funds`, `authorization_controls`, `webhook_approved`, `webhook_declined`, `webhook_timeout`, or `card_active`.
   */
  reason: string
}

export interface IssuingAuthorizationVerificationData {
  /**
   * One of `match`, `mismatch`, or `not_provided`.
   */
  address_line1_check: string
  /**
   * One of `match`, `mismatch`, or `not_provided`.
   */
  address_zip_check: string
  /**
   * One of `match`, `mismatch`, or `not_provided`.
   */
  cvc_check: string
}

export interface IssuingCard {
  authorization_controls: IssuingCardAuthorizationControls
  /**
   * The brand of the card.
   */
  brand: string
  /**
   * The [Cardholder](/docs/api#issuing_cardholder_object) object to which the card belongs.
   */
  cardholder?: IssuingCardholder | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * The expiration month of the card.
   */
  exp_month: number
  /**
   * The expiration year of the card.
   */
  exp_year: number
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The last 4 digits of the card number.
   */
  last4: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * The name of the cardholder, printed on the card.
   */
  name: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "issuing.card"
  /**
   * Where and how the card will be shipped.
   */
  shipping?: IssuingCardShipping | null
  /**
   * One of `active`, `inactive`, `pending`, or `canceled`.
   */
  status: string
  /**
   * One of `virtual` or `physical`.
   */
  type: string
}

export interface IssuingCardAuthorizationControls {
  /**
   * Array of strings containing [categories](/docs/api#issuing_authorization_object-merchant_data-category) of authorizations permitted on this card.
   */
  allowed_categories?: any[] | null
  /**
   * Array of strings containing [categories](/docs/api#issuing_authorization_object-merchant_data-category) of authorizations to always decline on this card.
   */
  blocked_categories?: any[] | null
  /**
   * The currency of the card. See [max_amount](/docs/api#issuing_card_object-authorization_controls-max_amount)
   */
  currency?: string | null
  /**
   * Maximum amount allowed per authorization on this card, in the currency of the card. Authorization amounts in a different currency will be converted to the card's currency when evaluating this control.
   */
  max_amount?: number | null
  /**
   * Maximum count of approved authorizations on this card. Counts all authorizations retroactively.
   */
  max_approvals?: number | null
}

export interface IssuingCardDetails {
  card: IssuingCard
  /**
   * The CVC number for the card.
   */
  cvc: string
  /**
   * The expiration month of the card.
   */
  exp_month: number
  /**
   * The expiration year of the card.
   */
  exp_year: number
  /**
   * The card number.
   */
  number: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "issuing.card_details"
}

export interface IssuingCardShipping {
  address: Address
  /**
   * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
   */
  carrier?: string | null
  /**
   * A unix timestamp representing a best estimate of when the card will be delivered.
   */
  eta?: number | null
  /**
   * Recipient name.
   */
  name: string
  /**
   * Recipient phone (including extension).
   */
  phone?: string | null
  /**
   * The delivery status of the card. One of `pending`, `shipped`, `delivered`, `returned`, or `failure`.
   */
  status?: string | null
  /**
   * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
   */
  tracking_number?: string | null
  /**
   * A link to the shipping carrier's site where you can view detailed information about a card shipment.
   */
  tracking_url?: string | null
}

export interface IssuingCardholder {
  billing: IssuingCardholderAddress
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * The cardholder's email address.
   */
  email?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * The cardholder's name. This will be printed on cards issued to them.
   */
  name: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "issuing.cardholder"
  /**
   * The cardholder's phone number.
   */
  phone_number?: string | null
  /**
   * One of `active` or `inactive`.
   */
  status: string
  /**
   * One of `individual` or `business_entity`.
   */
  type: string
}

export interface IssuingCardholderAddress {
  address: Address
  name?: string | null
}

export interface IssuingDispute {
  /**
   * Disputed amount. Usually the amount of the transaction, but can differ (usually because of currency fluctuation or because only part of the order is disputed).
   */
  amount: number
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * The currency the transaction was made in.
   */
  currency: string
  evidence: IssuingDisputesEvidence
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "issuing.dispute"
  /**
   * Reason for this dispute. One of `other` or `fraudulent`.
   */
  reason: string
  /**
   * Current status of dispute. One of `unsubmitted`, `under_review`, `won`, or `lost`.
   */
  status: string
  /**
   * The transaction being disputed.
   */
  transaction: string | IssuingTransaction
}

export interface IssuingDisputesEvidence {
  /**
   * Evidence to support a fraudulent dispute. This will only be present if your dispute's `reason` is `fraudulent`.
   */
  fraudulent?: IssuingDisputesFraudulentEvidence | null
  /**
   * Evidence to support an uncategorized dispute. This will only be present if your dispute's `reason` is `other`.
   */
  other?: IssuingDisputesOtherEvidence | null
}

export interface IssuingDisputesFraudulentEvidence {
  /**
   * Brief freeform text explaining why you are disputing this transaction.
   */
  dispute_explanation?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional file evidence supporting your dispute.
   */
  uncategorized_file?: string | FileUpload | null
}

export interface IssuingDisputesOtherEvidence {
  /**
   * Brief freeform text explaining why you are disputing this transaction.
   */
  dispute_explanation: string
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Additional file evidence supporting your dispute.
   */
  uncategorized_file?: string | FileUpload | null
}

export interface IssuingTransaction {
  amount: number
  /**
   * The `Authorization` object that led to this transaction.
   */
  authorization?: string | IssuingAuthorization | null
  balance_transaction?: string | BalanceTransaction | null
  /**
   * The card used to make this transaction.
   */
  card: string | IssuingCard
  /**
   * The cardholder to whom this transaction belongs.
   */
  cardholder?: string | IssuingCardholder | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  dispute?: string | IssuingDispute | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  merchant_data: IssuingAuthorizationMerchantData
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "issuing.transaction"
  /**
   * One of `capture`, `refund`, `cash_withdrawal`, or `refund_reversal`.
   */
  type: string
}

export interface LegacyTransferReversal {
  /**
   * Amount, in %s.
   */
  amount: number
  /**
   * Balance transaction that describes the impact on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "transfer_reversal"
  /**
   * ID of the transfer that was reversed.
   */
  transfer: string | Payout | Transfer | TransferRecipientTransfer
}

export interface LegalEntity {
  /**
   * An array of any owners with at least 25% ownership of the company, excluding the individual responsible for the account.
   */
  additional_owners?: (LegalEntityAdditionalOwner)[] | null
  address?: LegalEntityAddress
  /**
   * The Kana variation of the primary address of the legal entity (Japan only).
   */
  address_kana?: LegalEntityJapanAddress | null
  /**
   * The Kanji variation of the primary address of the legal entity (Japan only).
   */
  address_kanji?: LegalEntityJapanAddress | null
  /**
   * The legal name of the company.
   */
  business_name?: string | null
  /**
   * The Kana variation of the legal name of the company (Japan only).
   */
  business_name_kana?: string | null
  /**
   * The Kanji variation of the legal name of the company (Japan only).
   */
  business_name_kanji?: string | null
  /**
   * Whether the business ID number of the legal entity has been provided.
   */
  business_tax_id_provided?: boolean
  /**
   * Whether the business VAT number of the legal entity has been provided.
   */
  business_vat_id_provided?: boolean
  dob?: LegalEntityDob
  /**
   * The first name of the individual responsible for the account.
   */
  first_name?: string | null
  /**
   * The Kana variation of the first name of the individual responsible for the account (Japan only).
   */
  first_name_kana?: string | null
  /**
   * The Kanji variation of the first name of the individual responsible for the account (Japan only).
   */
  first_name_kanji?: string | null
  /**
   * The gender of the individual responsible for the account (International regulations require either "male" or "female").
   */
  gender?: string | null
  /**
   * The last name of the individual responsible for the account.
   */
  last_name?: string | null
  /**
   * The Kana varation of the last name of the individual responsible for the account (Japan only).
   */
  last_name_kana?: string | null
  /**
   * The Kanji varation of the last name of the individual responsible for the account (Japan only).
   */
  last_name_kanji?: string | null
  /**
   * The maiden name of the individual responsible for the account.
   */
  maiden_name?: string | null
  personal_address?: LegalEntityAddress
  /**
   * The Kana variation of the address of the individual responsible for the account (Japan only).
   */
  personal_address_kana?: LegalEntityJapanAddress | null
  /**
   * The Kanji variation of the address of the individual responsible for the account (Japan only).
   */
  personal_address_kanji?: LegalEntityJapanAddress | null
  /**
   * Whether the personal ID number of the individual responsible for the account has been provided.
   */
  personal_id_number_provided?: boolean
  /**
   * The phone number of the company, used for verification.
   */
  phone_number?: string | null
  /**
   * Whether the last 4 ssn digits of the individual responsible for the account have been provided.
   */
  ssn_last_4_provided?: boolean
  tax_id_registrar?: string
  /**
   * Either "individual" or "company", for what kind of legal entity the account owner is for.
   */
  type?: string | null
  verification?: LegalEntityVerification
}

export interface LegalEntityAdditionalOwner {
  address?: LegalEntityAddress
  dob: LegalEntityDob
  /**
   * The first name of this additional owner.
   */
  first_name?: string | null
  /**
   * The last name of this additional owner.
   */
  last_name?: string | null
  /**
   * The maiden name of this additional owner.
   */
  maiden_name?: string | null
  /**
   * Whether the personal ID number of this additional owner has been provided.
   */
  personal_id_number_provided?: boolean | null
  verification: LegalEntityVerification
}

export interface LegalEntityAddress {
  /**
   * City/District/Suburb/Town/Village.
   */
  city?: string | null
  /**
   * 2-letter country code.
   */
  country?: string | null
  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  line1?: string | null
  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  line2?: string | null
  /**
   * ZIP or postal code
   */
  postal_code?: string | null
  /**
   * State/County/Province/Region.
   */
  state?: string | null
}

export interface LegalEntityDob {
  /**
   * The day of birth, between 1 and 31.
   */
  day?: number | null
  /**
   * The month of birth, between 1 and 12.
   */
  month?: number | null
  /**
   * The four-digit year of birth.
   */
  year?: number | null
}

export interface LegalEntityJapanAddress {
  /**
   * City/Ward.
   */
  city?: string | null
  /**
   * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
   */
  country?: string | null
  /**
   * Block/Building number.
   */
  line1?: string | null
  /**
   * Building details.
   */
  line2?: string | null
  /**
   * Zip/Postal Code.
   */
  postal_code?: string | null
  /**
   * Prefecture.
   */
  state?: string | null
  /**
   * Town/cho-me.
   */
  town?: string | null
}

export interface LegalEntityVerification {
  /**
   * A user-displayable string describing the verification state for this legal entity. For example, if a document is uploaded and the picture is too fuzzy, this may say "Identity document is too unclear to read".
   */
  details?: string | null
  /**
   * One of `scan_corrupt`, `scan_not_readable`, `scan_failed_greyscale`, `scan_not_uploaded`, `scan_id_type_not_supported`, `scan_id_country_not_supported`, `scan_name_mismatch`, `scan_failed_other`, `failed_keyed_identity`, or `failed_other`. A machine-readable code specifying the verification state for this legal entity.
   */
  details_code?: string | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A photo (jpg or png) of the front of an identifying document, either a passport or local ID card.
   */
  document?: string | FileUpload | null
  /**
   * (ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A photo (jpg or png) of the back of an identifying document, either a passport or local ID card.
   */
  document_back?: string | FileUpload | null
  /**
   * The state of verification for this legal entity. Possible values are `unverified`, `pending`, or `verified`.
   */
  status: string
}

export interface LightAccountLogout {

}

export interface LimitedAccount {
  application_icon?: string
  application_logo?: string
  application_name?: string | null
  application_url?: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "account"
}

export interface LoginLink {
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "login_link"
  /**
   * The URL for the login link.
   */
  url: string
}

export interface NotificationEvent {
  /**
   * The Stripe API version used to render `data`. *Note: This property is populated only for events on or after October 31, 2014*.
   */
  api_version?: string | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  data: NotificationEventData
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "event"
  /**
   * Number of webhooks that have yet to be successfully delivered (i.e., to return a 20x response) to the URLs you've specified.
   */
  pending_webhooks: number
  /**
   * Information on the API request that instigated the event.
   */
  request?: NotificationEventRequest | null
  /**
   * Description of the event (e.g., `invoice.created` or `charge.refunded`).
   */
  type: string
}

export interface NotificationEventData {
  /**
   * Object containing the API resource relevant to the event. For example, an `invoice.created` event will have a full [invoice object](#invoice_object) as the value of the object key.
   */
  object: { [key: string]: string }
  /**
   * Object containing the names of the attributes that have changed, and their previous values (sent along only with *.updated events).
   */
  previous_attributes?: { [key: string]: string }
}

export interface NotificationEventRequest {
  /**
   * ID of the API request that caused the event. If null, the event was automatic (e.g., Stripe's automatic subscription handling). Request logs are available in the [dashboard](https://dashboard.stripe.com/logs), but currently not in the API.
   */
  id?: string | null
  /**
   * The idempotency key transmitted during the request, if any. *Note: This property is populated only for events on or after May 23, 2017*.
   */
  idempotency_key?: string | null
}

export interface OrderReturnList {
  data: (OrderReturn)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface Order {
  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount for the order.
   */
  amount: number
  amount_returned?: number | null
  /**
   * ID of the Connect Application that created the order.
   */
  application?: string | null
  application_fee?: number | null
  /**
   * The ID of the payment used to pay for the order. Present if the order status is `paid`, `fulfilled`, or `refunded`.
   */
  charge?: string | Charge | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * The customer used for the order.
   */
  customer?: string | Customer | DeletedCustomer | null
  /**
   * The email address of the customer placing the order.
   */
  email?: string | null
  external_coupon_code?: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * List of items constituting the order. An order can have up to 25 items.
   */
  items: (OrderItem)[]
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "order"
  returns?: OrderReturnList | null
  /**
   * The shipping method that is currently selected for this order, if any. If present, it is equal to one of the `id`s of shipping methods in the `shipping_methods` array. At order creation time, if there are multiple shipping methods, Stripe will automatically selected the first method.
   */
  selected_shipping_method?: string | null
  /**
   * The shipping address for the order. Present if the order is for goods to be shipped.
   */
  shipping?: Shipping | null
  /**
   * A list of supported shipping methods for this order. The desired shipping method can be specified either by updating the order, or when paying it.
   */
  shipping_methods?: (ShippingMethod)[] | null
  /**
   * Current order status. One of `created`, `paid`, `canceled`, `fulfilled`, or `returned`. More details in the [Orders Guide](/docs/orders/guide#understanding-order-statuses).
   */
  status: string
  /**
   * The timestamps at which the order status was updated.
   */
  status_transitions?: StatusTransitions | null
  updated?: number | null
  /**
   * The user's order ID if it is different from the Stripe order ID.
   */
  upstream_id?: string
}

export interface OrderItem {
  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount for the line item.
   */
  amount: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Description of the line item, meant to be displayable to the user (e.g., `"Express shipping"`).
   */
  description: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "order_item"
  /**
   * The ID of the associated object for this line item. Expandable if not null (e.g., expandable to a SKU).
   */
  parent?: string | Discount | Sku | null
  /**
   * A positive integer representing the number of instances of `parent` that are included in this order item. Applicable/present only if `type` is `sku`.
   */
  quantity?: number | null
  /**
   * The type of line item. One of `sku`, `tax`, `shipping`, or `discount`.
   */
  type: string
}

export interface OrderReturn {
  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount for the returned line item.
   */
  amount: number
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The items included in this order return.
   */
  items: (OrderItem)[]
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "order_return"
  /**
   * The order that this return includes items from.
   */
  order?: string | Order | null
  /**
   * The ID of the refund issued for this return.
   */
  refund?: string | Refund | null
}

export interface PackageDimensions {
  /**
   * Height, in inches.
   */
  height: number
  /**
   * Length, in inches.
   */
  length: number
  /**
   * Weight, in ounces.
   */
  weight: number
  /**
   * Width, in inches.
   */
  width: number
}

export interface PaymentRefundList {
  data: (PaymentRefund)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface Payment {
  /**
   * A positive integer in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency) representing how much to charge. The minimum amount is $0.50 US or [equivalent in charge currency](https://support.stripe.com/questions/what-is-the-minimum-amount-i-can-charge-with-stripe).
   */
  amount: number
  /**
   * Amount in %s refunded (can be less than the amount attribute on the charge if a partial refund was issued).
   */
  amount_refunded: number
  /**
   * ID of the Connect application that created the charge.
   */
  application?: string | Application | null
  /**
   * The application fee (if any) for the charge. [See the Connect documentation](/docs/connect/direct-charges#collecting-fees) for details.
   */
  application_fee?: string | BackwardsCompatiblePlatformEarning | PlatformFee | null
  /**
   * ID of the balance transaction that describes the impact of this charge on your account balance (not including refunds or disputes).
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * If the charge was created without capturing, this Boolean represents whether it is still uncaptured or has since been captured.
   */
  captured: boolean
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * ID of the customer this charge is for if one exists.
   */
  customer?: string | Customer | DeletedCustomer | null
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * The account (if any) the charge was made on behalf of, with an automatic transfer. [See the Connect documentation](/docs/connect/destination-charges) for details.
   */
  destination?: string | Account | null
  /**
   * Details about the dispute if the charge has been disputed.
   */
  dispute?: string | Dispute | null
  /**
   * Error code explaining reason for charge failure if available (see [the errors section](/docs/api#errors) for a list of codes).
   */
  failure_code?: string | null
  /**
   * Message to user further explaining reason for charge failure if available.
   */
  failure_message?: string | null
  /**
   * Hash with information on fraud assessments for the charge. Assessments reported by you have the key `user_report` and, if set, possible values of `safe` and `fraudulent`. Assessments from Stripe have the key `stripe_report` and, if set, the value `fraudulent`.
   */
  fraud_details?: { [key: string]: string } | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * ID of the invoice this charge is for if one exists.
   */
  invoice?: string | Invoice | null
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "payment"
  /**
   * The account (if any) the charge was made on behalf of without triggering an automatic transfer. See the [Connect documentation](/docs/connect/charges-transfers) for details.
   */
  on_behalf_of?: string | Account | null
  /**
   * ID of the order this charge is for if one exists.
   */
  order?: string | Order | null
  /**
   * Details about whether the payment was accepted, and why. See [understanding declines](/docs/declines) for details.
   */
  outcome?: ChargeOutcome | null
  /**
   * `true` if the charge succeeded, or was successfully authorized for later capture.
   */
  paid: boolean
  payment_method?: "ach" | "alipay" | "bitcoin" | "card" | "source" | "stripe"
  /**
   * This is the email address that the receipt for this charge was sent to.
   */
  receipt_email?: string | null
  /**
   * This is the transaction number that appears on email receipts sent for this charge. This attribute will be `null` until a receipt has been sent.
   */
  receipt_number?: string | null
  /**
   * Whether the charge has been fully refunded. If the charge is only partially refunded, this attribute will still be false.
   */
  refunded: boolean
  /**
   * A list of refunds that have been applied to the charge.
   */
  refunds: PaymentRefundList
  /**
   * ID of the review associated with this charge if one exists.
   */
  review?: string | RadarReview | null
  /**
   * Shipping information for the charge.
   */
  shipping?: Shipping | null
  /**
   * For most Stripe users, the source of every charge is a credit or debit card. This hash is then the [card object](#card_object) describing that card.
   */
  source: AccountDebitAccount | AlipayAccount | BankAccount | BitcoinReceiver | Card | LimitedAccount | Source
  /**
   * The transfer ID which created this charge. Only present if the charge came from another Stripe account. [See the Connect documentation](/docs/connect/destination-charges) for details.
   */
  source_transfer?: string | Transfer | null
  /**
   * Extra information about a charge. This will appear on your customer's credit card statement. It must contain at least one letter.
   */
  statement_descriptor?: string | null
  /**
   * The status of the payment is either `succeeded`, `pending`, or `failed`.
   */
  status: string
  /**
   * ID of the transfer to the `destination` account (only applicable if the charge was created using the `destination` parameter).
   */
  transfer?: string | Transfer
  /**
   * A string that identifies this transaction as part of a group. See the [Connect documentation](/docs/connect/charges-transfers#grouping-transactions) for details.
   */
  transfer_group?: string | null
}

export interface PaymentFlowsPaymentIntentResourceTransferData {
  /**
   * The amount to transfer automatically.
   */
  amount: number
}

export interface PaymentFlowsPaymentIntentResourceChargeList {
  /**
   * The list contains all Charges that have been created by this PaymentIntent.
   */
  data: (Charge)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface PaymentIntent {
  /**
   * The list of source types that this PaymentIntent was allowed to use. Values can be any combination of `card`.
   */
  allowed_source_types: any[]
  /**
   * Amount intended to be collected by this PaymentIntent.
   */
  amount: number
  /**
   * Amount that can be captured from this PaymentIntent.
   */
  amount_capturable: number
  /**
   * Amount that was collected by this PaymentIntent.
   */
  amount_received: number
  /**
   * ID of the Connect application that created the PaymentIntent.
   */
  application?: string | Application | null
  /**
   * The amount of the application fee (if any) for the resulting payment. [See the Connect documentation](/docs/connect/direct-charges#collecting-fees) for details.
   */
  application_fee_amount?: number | null
  /**
   * Populated when `status` is `canceled`, this is the time at which the PaymentIntent was canceled. Measured in seconds since the Unix epoch.
   */
  canceled_at?: number | null
  /**
   * Capture method of this PaymentIntent, one of `automatic` or `manual`.
   */
  capture_method: string
  /**
   * Charges that were created by this PaymentIntent, if any.
   */
  charges: PaymentFlowsPaymentIntentResourceChargeList
  /**
   * The client secret of this PaymentIntent. Used for client-side retrieval using a publishable key. Please refer to [dynamic authentication](/docs/payments/dynamic-authentication) guide on how `client_secret` should be handled.
   */
  client_secret?: string | null
  /**
   * Confirmation method of this PaymentIntent, one of `secret` or `publishable`.
   */
  confirmation_method: string
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * ID of the Customer this PaymentIntent is for if one exists.
   */
  customer?: string | Customer | null
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * Available next Source actions to take for this PaymentIntent.
   */
  next_source_action?: PaymentIntentNextSourceAction | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "payment_intent"
  /**
   * The account (if any) the payment will be made on behalf of. To triggeran automatic transfer when the payment is complete, use `transfer_data`in conjunction with this parameter."
   */
  on_behalf_of?: string | Account | null
  /**
   * Email address that the receipt for the resulting payment will be sent to.
   */
  receipt_email?: string | null
  /**
   * The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method's app or site.If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme.
   */
  return_url?: string | null
  /**
   * ID of the review associated with this PaymentIntent, if any.
   */
  review?: string | RadarReview | null
  /**
   * Shipping information for this PaymentIntent.
   */
  shipping?: Shipping | null
  /**
   * ID of the source used in this PaymentIntent.
   */
  source?: string | Card | Source | null
  /**
   * Extra information about a PaymentIntent. This will appear on your customer's statement when this PaymentIntent succeeds in creating a charge.
   */
  statement_descriptor?: string | null
  /**
   * Status of this PaymentIntent, one of `requires_source`, `requires_confirmation`, `requires_source_action`, `processing`, `requires_capture`, `canceled`, or `succeeded`.
   */
  status: string
  /**
   * The data with which to automatically create a Transfer when the payment is finalized. The destination of the Transfer is the account set as `on_behalf_of`.
   */
  transfer_data?: PaymentFlowsPaymentIntentResourceTransferData | null
  /**
   * A string that identifies the resulting payment as part of a group. See the [Connect documentation](/docs/connect/charges-transfers#grouping-transactions) for details.
   */
  transfer_group?: string | null
}

export interface PaymentIntentClient {
  /**
   * The list of source types that this PaymentIntent was allowed to use. Values can be any combination of `card`.
   */
  allowed_source_types: any[]
  /**
   * Amount intended to be collected by this PaymentIntent.
   */
  amount: number
  /**
   * Populated when `status` is `canceled`, this is the time at which the PaymentIntent was canceled. Measured in seconds since the Unix epoch.
   */
  canceled_at?: number | null
  /**
   * Capture method of this PaymentIntent, one of `automatic` or `manual`.
   */
  capture_method: string
  /**
   * The client secret of this PaymentIntent. Used for client-side retrieval using a publishable key. Please refer to [dynamic authentication](/docs/payments/dynamic-authentication) guide on how `client_secret` should be handled.
   */
  client_secret?: string | null
  /**
   * Confirmation method of this PaymentIntent, one of `secret` or `publishable`.
   */
  confirmation_method: string
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Available next Source actions to take for this PaymentIntent.
   */
  next_source_action?: PaymentIntentNextSourceAction | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "payment_intent"
  /**
   * Email address that the receipt for the resulting payment will be sent to.
   */
  receipt_email?: string | null
  /**
   * The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method's app or site.If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme.
   */
  return_url?: string | null
  /**
   * Shipping information for this PaymentIntent.
   */
  shipping?: Shipping | null
  /**
   * ID of the source used in this PaymentIntent.
   */
  source?: string | Card | Source | null
  /**
   * Status of this PaymentIntent, one of `requires_source`, `requires_confirmation`, `requires_source_action`, `processing`, `requires_capture`, `canceled`, or `succeeded`.
   */
  status: string
}

export interface PaymentIntentNextSourceAction {
  /**
   * Type of next source action to perform, one of `authorize_with_url`.
   */
  type: string
  /**
   * Type-specific next source action data.
   */
  value: { [key: string]: string }
}

export interface PaymentRefund {
  /**
   * Amount, in %s.
   */
  amount: number
  /**
   * Balance transaction that describes the impact on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * ID of the charge that was refunded.
   */
  charge?: string | Charge | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * If the refund failed, this balance transaction describes the adjustment made on your account balance that reverses the initial balance transaction.
   */
  failure_balance_transaction?: string | BalanceTransaction
  /**
   * If the refund failed, the reason for refund failure if known. Possible values are `lost_or_stolen_card`, `expired_or_canceled_card`, or `unknown`.
   */
  failure_reason?: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "payment_refund"
  /**
   * ID of the charge that was refunded.
   */
  payment?: string | Charge | null
  /**
   * Reason for the refund. If set, possible values are `duplicate`, `fraudulent`, and `requested_by_customer`.
   */
  reason?: string | null
  /**
   * This is the transaction number that appears on email receipts sent for this refund.
   */
  receipt_number?: string | null
  /**
   * Status of the refund. For credit card refunds, this can be `succeeded` or `failed`. For other types of refunds, it can be `pending`, `succeeded`, `failed`, or `canceled`. Refer to our [refunds](/docs/refunds#failed-refunds) documentation for more details.
   */
  status?: string | null
}

export interface Payout {
  /**
   * Amount (in %s) to be transferred to your bank account or debit card.
   */
  amount: number
  /**
   * Date the payout is expected to arrive in the bank. This factors in delays like weekends or bank holidays.
   */
  arrival_date: number
  /**
   * Returns `true` if the payout was created by an [automated payout schedule](/docs/payouts#payout-schedule), and `false` if it was [requested manually](https://stripe.com/docs/payouts#manual-payouts).
   */
  automatic: boolean
  /**
   * ID of the balance transaction that describes the impact of this payout on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * ID of the bank account or card the payout was sent to.
   */
  destination?: string | BankAccount | Card | DeletedBankAccount | DeletedCard | null
  /**
   * If the payout failed or was canceled, this will be the ID of the balance transaction that reversed the initial balance transaction, and puts the funds from the failed payout back in your balance.
   */
  failure_balance_transaction?: string | BalanceTransaction | null
  /**
   * Error code explaining reason for payout failure if available. See [Types of payout failures](/docs/api#payout_failures) for a list of failure codes.
   */
  failure_code?: string | null
  /**
   * Message to user further explaining reason for payout failure if available.
   */
  failure_message?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * The method used to send this payout, which can be `standard` or `instant`. `instant` is only supported for payouts to debit cards. (See [Instant payouts for marketplaces](/blog/instant-payouts-for-marketplaces) for more information.)
   */
  method: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "payout"
  /**
   * The source balance this payout came from. One of `card`, `bank_account`, or `alipay_account`.
   */
  source_type: string
  /**
   * Extra information about a payout to be displayed on the user's bank statement.
   */
  statement_descriptor?: string | null
  /**
   * Current status of the payout (`paid`, `pending`, `in_transit`, `canceled` or `failed`). A payout will be `pending` until it is submitted to the bank, at which point it becomes `in_transit`. It will then change to `paid` if the transaction goes through. If it does not go through successfully, its status will change to `failed` or `canceled`.
   */
  status: string
  /**
   * Can be `bank_account` or `card`.
   */
  type: string
}

export interface Plan {
  /**
   * Whether the plan is currently available for new subscriptions.
   */
  active: boolean
  /**
   * Specifies a usage aggregation strategy for plans of `usage_type=metered`. Allowed values are `sum` for summing up all usage during a period, `last_during_period` for picking the last usage record reported within a period, `last_ever` for picking the last usage record ever (across period bounds) or `max` which picks the usage record with the maximum reported usage during a period. Defaults to `sum`.
   */
  aggregate_usage?: "last_during_period" | "last_ever" | "max" | "sum" | null
  /**
   * The amount in %s to be charged on the interval specified.
   */
  amount?: number | null
  /**
   * Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `amount`) will be charged per unit in `quantity` (for plans with `usage_type=licensed`), or per unit of total usage (for plans with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.
   */
  billing_scheme?: "per_unit" | "tiered" | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * One of `day`, `week`, `month` or `year`. The frequency with which a subscription should be billed.
   */
  interval: "day" | "month" | "week" | "year"
  /**
   * The number of intervals (specified in the `interval` property) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
   */
  interval_count: number
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * A brief description of the plan, hidden from customers.
   */
  nickname?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "plan"
  /**
   * The product whose pricing this plan determines.
   */
  product?: string | Product | DeletedProduct | null
  /**
   * Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.
   */
  tiers?: (PlanTier)[] | null
  /**
   * Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price, in `graduated` tiering pricing can successively change as the quantity grows.
   */
  tiers_mode?: "graduated" | "volume" | null
  /**
   * Apply a transformation to the reported usage or set quantity before computing the billed price. Cannot be combined with `tiers`.
   */
  transform_usage?: TransformUsage | null
  /**
   * Default number of trial days when subscribing a customer to this plan using [`trial_from_plan=true`](/docs/api#create_subscription-trial_from_plan).
   */
  trial_period_days?: number | null
  /**
   * Configures how the quantity per period should be determined, can be either `metered` or `licensed`. `licensed` will automatically bill the `quantity` set for a plan when adding it to a subscription, `metered` will aggregate the total usage based on usage records. Defaults to `licensed`.
   */
  usage_type: "licensed" | "metered"
}

export interface PlanTier {
  /**
   * Per unit price for units relevant to the tier.
   */
  amount: number
  /**
   * Up to and including to this quantity will be contained in the tier.
   */
  up_to?: number | null
}

export interface FeeRefundList {
  data: (FeeRefund)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface PlatformEarning {
  /**
   * ID of the Stripe account this fee was taken from.
   */
  account: string | Account
  /**
   * Amount earned, in %s.
   */
  amount: number
  /**
   * Amount in %s refunded (can be less than the amount attribute on the fee if a partial refund was issued)
   */
  amount_refunded: number
  /**
   * ID of the Connect application that earned the fee.
   */
  application: string | Application
  /**
   * Balance transaction that describes the impact of this collected application fee on your account balance (not including refunds).
   */
  balance_transaction: string | BalanceTransaction
  /**
   * ID of the charge that the application fee was taken from.
   */
  charge: string | Charge
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "application_fee"
  /**
   * ID of the corresponding charge on the platform account, if this fee was the result of a charge using the `destination` parameter.
   */
  originating_transaction?: string | Charge | Transfer | null
  /**
   * Whether the fee has been fully refunded. If the fee is only partially refunded, this attribute will still be false.
   */
  refunded: boolean
  /**
   * A list of refunds that have been applied to the fee.
   */
  refunds: FeeRefundList
}

export interface FeeRefundList {
  data: (FeeRefund)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface PlatformFee {
  /**
   * ID of the Stripe account this fee was taken from.
   */
  account: string | Account
  /**
   * Amount earned, in %s.
   */
  amount: number
  amount_refunded: number
  /**
   * ID of the Connect Application that earned the fee.
   */
  application: string | Application
  /**
   * Balance transaction that describes the impact of this collected application fee on your account balance (not including refunds).
   */
  balance_transaction: string | BalanceTransaction
  /**
   * ID of the charge that the application fee was taken from.
   */
  charge: string | Charge
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "application_fee"
  /**
   * ID of the corresponding charge on the platform account, if this fee was the result of a charge using the `destination` parameter.
   */
  originating_transaction?: string | Charge | Transfer | null
  /**
   * Whether the fee has been fully refunded. If the fee is only partially refunded, this attribute will still be false.
   */
  refunded: boolean
  /**
   * A list of refunds that have been applied to the fee.
   */
  refunds: FeeRefundList
}

export interface Product {
  /**
   * Whether the product is currently available for purchase.
   */
  active?: boolean | null
  /**
   * A list of up to 5 attributes that each SKU can provide values for (e.g., `["color", "size"]`). Only applicable to products of `type=good`.
   */
  attributes?: (string)[] | null
  /**
   * A short one-line description of the product, meant to be displayable to the customer. Only applicable to products of `type=good`.
   */
  caption?: string | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * An array of connect application identifiers that cannot purchase this product. Only applicable to products of `type=good`.
   */
  deactivate_on?: any[]
  /**
   * The product's description, meant to be displayable to the customer. Only applicable to products of `type=good`.
   */
  description?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * A list of up to 8 URLs of images for this product, meant to be displayable to the customer. Only applicable to products of `type=good`.
   */
  images: (string)[]
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * The product's name, meant to be displayable to the customer. Applicable to both `service` and `good` types.
   */
  name: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "product"
  /**
   * The dimensions of this product for shipping purposes. A SKU associated with this product can override this value by having its own `package_dimensions`. Only applicable to products of `type=good`.
   */
  package_dimensions?: PackageDimensions | null
  /**
   * Whether this product is a shipped good. Only applicable to products of `type=good`.
   */
  shippable?: boolean | null
  /**
   * Extra information about a product which will appear on your customer's credit card statement. In the case that multiple products are billed at once, the first statement descriptor will be used. Only available on products of type=`service`.
   */
  statement_descriptor?: string | null
  /**
   * The type of the product. The product is either of type `good`, which is eligible for use with Orders and SKUs, or `service`, which is eligible for use with Subscriptions and Plans.
   */
  type: "good" | "service"
  /**
   * A label that represents units of this product, such as seat(s), in Stripe and on customers’ receipts and invoices. Only available on products of type=`service`.
   */
  unit_label?: string | null
  updated: number
  /**
   * A URL of a publicly-accessible webpage for this product. Only applicable to products of `type=good`.
   */
  url?: string | null
}

export interface RadarReview {
  /**
   * The charge associated with this review.
   */
  charge?: string | Charge | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "review"
  /**
   * If `true`, the review needs action.
   */
  open: boolean
  /**
   * The reason the review is currently open or closed. One of `rule`, `manual`, `approved`, `refunded`, `refunded_as_fraud`, or `disputed`.
   */
  reason: string
}

export interface RadarRule {
  /**
   * The action taken on the payment.
   */
  action: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The predicate to evaluate the payment against.
   */
  predicate: string
}

export interface Refund {
  /**
   * Amount, in %s.
   */
  amount: number
  /**
   * Balance transaction that describes the impact on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * ID of the charge that was refunded.
   */
  charge?: string | Charge | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * If the refund failed, this balance transaction describes the adjustment made on your account balance that reverses the initial balance transaction.
   */
  failure_balance_transaction?: string | BalanceTransaction
  /**
   * If the refund failed, the reason for refund failure if known. Possible values are `lost_or_stolen_card`, `expired_or_canceled_card`, or `unknown`.
   */
  failure_reason?: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "refund"
  /**
   * Reason for the refund. If set, possible values are `duplicate`, `fraudulent`, and `requested_by_customer`.
   */
  reason?: string | null
  /**
   * This is the transaction number that appears on email receipts sent for this refund.
   */
  receipt_number?: string | null
  /**
   * Status of the refund. For credit card refunds, this can be `succeeded` or `failed`. For other types of refunds, it can be `pending`, `succeeded`, `failed`, or `canceled`. Refer to our [refunds](/docs/refunds#failed-refunds) documentation for more details.
   */
  status?: string | null
}

export interface ReportingReportRun {
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * If something should go wrong during the run, a message about the failure (populated when `status=failed`).
   */
  error?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "reporting.report_run"
  parameters: FinancialReportingFinanceReportRunRunParameters
  /**
   * The ID of the Report Type to run, such as `"activity.summary.1"`.
   */
  report_type: string
  /**
   * The file object representing the result of the report run (populated when `status=succeeded`).
   */
  result?: File | null
  /**
   * Status of this report run. This will be `pending` when the run is initially created. When the run finishes, this will be set to `succeeded` and the `result` field will be populated. Rarely, we may encounter an error, at which point this will be set to `failed` and the `error` field will be populated.
   */
  status: string
  /**
   * Timestamp at which this run successfully finished (populated when `status=succeeded`). Measured in seconds since the Unix epoch.
   */
  succeeded_at?: number | null
}

export interface ReportingReportType {
  /**
   * Most recent time for which this Report Type is available. Measured in seconds since the Unix epoch.
   */
  data_available_end: number
  /**
   * Earliest time for which this Report Type is available. Measured in seconds since the Unix epoch.
   */
  data_available_start: number
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Human-readable name of the Report Type
   */
  name: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "reporting.report_type"
  /**
   * When this Report Type was latest updated. Measured in seconds since the Unix epoch.
   */
  updated: number
  /**
   * Version of the Report Type. Different versions report with the same ID will have the same purpose, but may take different run parameters or have different result schemas.
   */
  version: number
}

export interface ReserveTransaction {
  amount: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "reserve_transaction"
}

export interface Shipping {
  address: Address
  /**
   * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
   */
  carrier?: string | null
  /**
   * Recipient name.
   */
  name: string
  /**
   * Recipient phone (including extension).
   */
  phone?: string | null
  /**
   * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
   */
  tracking_number?: string | null
}

export interface ShippingMethod {
  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount for the line item.
   */
  amount: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * The estimated delivery date for the given shipping method. Can be either a specific date or a range.
   */
  delivery_estimate?: DeliveryEstimate | null
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description: string
  /**
   * Unique identifier for the object.
   */
  id: string
}

export interface Sku {
  /**
   * Whether the SKU is available for purchase.
   */
  active: boolean
  /**
   * A dictionary of attributes and values for the attributes defined by the product. If, for example, a product's attributes are `["size", "gender"]`, a valid SKU has the following dictionary of attributes: `{"size": "Medium", "gender": "Unisex"}`.
   */
  attributes: { [key: string]: string }
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The URL of an image for this SKU, meant to be displayable to the customer.
   */
  image?: string | null
  inventory: Inventory
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "sku"
  /**
   * The dimensions of this SKU for shipping purposes.
   */
  package_dimensions?: PackageDimensions | null
  /**
   * The cost of the item as a positive integer in the smallest currency unit (that is, 100 cents to charge $1.00, or 100 to charge ¥100, Japanese Yen being a zero-decimal currency).
   */
  price: number
  /**
   * The ID of the product this SKU is associated with. The product must be currently active.
   */
  product: string | Product
  updated: number
}

export interface Source {
  ach_credit_transfer?: { account_number?: string | null, bank_name?: string | null, fingerprint?: string | null, routing_number?: string | null, swift_code?: string | null }
  ach_debit?: { bank_name?: string | null, country?: string | null, fingerprint?: string | null, last4?: string | null, routing_number?: string | null, type?: string | null }
  alipay?: { data_string?: string | null, native_url?: string | null, statement_descriptor?: string | null }
  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount associated with the source. This is the amount for which the source will be chargeable once ready. Required for `single_use` sources.
   */
  amount?: number | null
  bancontact?: { bank_code?: string | null, bank_name?: string | null, bic?: string | null, iban_last4?: string | null, preferred_language?: string | null, statement_descriptor?: string | null }
  card?: { address_line1_check?: string | null, address_zip_check?: string | null, brand?: string | null, card_automatically_updated?: boolean, country?: string | null, cvc_check?: string | null, dynamic_last4?: string | null, exp_month?: number | null, exp_year?: number | null, fingerprint?: string, funding?: string | null, last4?: string | null, name?: string | null, skip_validation?: boolean, three_d_secure?: string, tokenization_method?: string | null }
  card_present?: { application_cryptogram?: string, application_preferred_name?: string, authorization_response_code?: string, brand?: string | null, card_automatically_updated?: boolean, country?: string | null, cvm_type?: string, data_type?: string | null, dedicated_file_name?: string, emv_auth_data?: string, evidence_customer_signature?: string | null, evidence_transaction_certificate?: string | null, exp_month?: number | null, exp_year?: number | null, fingerprint?: string, funding?: string | null, last4?: string | null, mid?: string, pos_device_id?: string | null, pos_entry_mode?: string, read_method?: string | null, reader?: string | null, terminal_verification_results?: string, tid?: string, transaction_status_information?: string }
  /**
   * The client secret of the source. Used for client-side retrieval using a publishable key.
   */
  client_secret: string
  code_verification?: SourceCodeVerificationFlow
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) associated with the source. This is the currency for which the source will be chargeable once ready. Required for `single_use` sources.
   */
  currency?: string | null
  eps?: { reference?: string | null, statement_descriptor?: string | null }
  /**
   * The authentication `flow` of the source. `flow` is one of `redirect`, `receiver`, `code_verification`, `none`.
   */
  flow: string
  giropay?: { bank_code?: string | null, bank_name?: string | null, bic?: string | null, statement_descriptor?: string | null }
  /**
   * Unique identifier for the object.
   */
  id: string
  ideal?: { bank?: string | null, bic?: string | null, iban_last4?: string | null, statement_descriptor?: string | null }
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata?: { [key: string]: string } | null
  multibanco?: { entity?: string | null, reference?: string | null, refund_account_holder_address_city?: string | null, refund_account_holder_address_country?: string | null, refund_account_holder_address_line1?: string | null, refund_account_holder_address_line2?: string | null, refund_account_holder_address_postal_code?: string | null, refund_account_holder_address_state?: string | null, refund_account_holder_name?: string | null, refund_iban?: string | null }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "source"
  /**
   * Information about the owner of the payment instrument that may be used or required by particular source types.
   */
  owner?: SourceOwner | null
  p24?: { reference?: string | null }
  paper_check?: { mailing_address_city?: string | null, mailing_address_country?: string | null, mailing_address_line1?: string | null, mailing_address_line2?: string | null, mailing_address_postal_code?: string | null, mailing_address_state?: string | null }
  receiver?: SourceReceiverFlow
  redirect?: SourceRedirectFlow
  sepa_credit_transfer?: { bank_name?: string | null, bic?: string | null, iban?: string | null, refund_account_holder_address_city?: string | null, refund_account_holder_address_country?: string | null, refund_account_holder_address_line1?: string | null, refund_account_holder_address_line2?: string | null, refund_account_holder_address_postal_code?: string | null, refund_account_holder_address_state?: string | null, refund_account_holder_name?: string | null, refund_iban?: string | null }
  sepa_debit?: { bank_code?: string | null, branch_code?: string | null, country?: string | null, fingerprint?: string | null, last4?: string | null, mandate_reference?: string | null, mandate_url?: string | null, skip_validation?: boolean }
  sofort?: { bank_code?: string | null, bank_name?: string | null, bic?: string | null, country?: string | null, iban_last4?: string | null, preferred_language?: string | null, statement_descriptor?: string | null }
  /**
   * Extra information about a source. This will appear on your customer's statement every time you charge the source.
   */
  statement_descriptor?: string | null
  /**
   * The status of the source, one of `canceled`, `chargeable`, `consumed`, `failed`, or `pending`. Only `chargeable` sources can be used to create a charge.
   */
  status: string
  three_d_secure?: { authenticated?: boolean | null, card?: string | null, customer?: string | null }
  /**
   * The `type` of the source. The `type` is a payment method, one of `ach_credit_transfer`, `ach_debit`, `alipay`, `bancontact`, `card`, `card_present`, `eps`, `giropay`, `ideal`, `multibanco`, `p24`, `paper_check`, `sepa_credit_transfer`, `sepa_debit`, `sofort`, or `three_d_secure`. An additional hash is included on the source with a name matching this value. It contains additional information specific to the [payment method](/docs/sources) used.
   */
  type: "ach_credit_transfer" | "ach_debit" | "alipay" | "bancontact" | "card" | "card_present" | "eps" | "giropay" | "ideal" | "multibanco" | "p24" | "paper_check" | "sepa_credit_transfer" | "sepa_debit" | "sofort" | "three_d_secure"
  /**
   * Either `reusable` or `single_use`. Whether this source should be reusable or not. Some source types may or may not be reusable by construction, while other may leave the option at creation. If an incompatible value is passed, an error will be returned.
   */
  usage?: string | null
}

export interface SourceCodeVerificationFlow {
  /**
   * The number of attempts remaining to authenticate the source object with a verification code.
   */
  attempts_remaining: number
  /**
   * The status of the code verification, either `pending` (awaiting verification, `attempts_remaining` should be greater than 0), `succeeded` (successful verification) or `failed` (failed verification, cannot be verified anymore as `attempts_remaining` should be 0).
   */
  status: string
}

export interface SourceMandateNotification {
  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the amount associated with the mandate notification. The amount is expressed in the currency of the underlying source. Required if the notification type is `debit_initiated`.
   */
  amount?: number | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "source_mandate_notification"
  /**
   * The reason of the mandate notification. Valid reasons are `mandate_confirmed` or `debit_initiated`.
   */
  reason: string
  source: Source
  /**
   * The status of the mandate notification. Valid statuses are `pending` or `submitted`.
   */
  status: string
  /**
   * The type of source this mandate notification is attached to. Should be the source type identifier code for the payment method, such as `three_d_secure`.
   */
  type: string
}

export interface SourceOwner {
  /**
   * Owner's address.
   */
  address?: Address | null
  /**
   * Owner's email address.
   */
  email?: string | null
  /**
   * Owner's full name.
   */
  name?: string | null
  /**
   * Owner's phone number (including extension).
   */
  phone?: string | null
  /**
   * Verified owner's address. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.
   */
  verified_address?: Address | null
  /**
   * Verified owner's email address. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.
   */
  verified_email?: string | null
  /**
   * Verified owner's full name. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.
   */
  verified_name?: string | null
  /**
   * Verified owner's phone number (including extension). Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.
   */
  verified_phone?: string | null
}

export interface SourceReceiverFlow {
  /**
   * The address of the receiver source. This is the value that should be communicated to the customer to send their funds to.
   */
  address?: string | null
  /**
   * The total amount that was charged by you. The amount charged is expressed in the source's currency.
   */
  amount_charged: number
  /**
   * The total amount received by the receiver source. `amount_received = amount_returned + amount_charged` is true at all time. The amount received is expressed in the source's currency.
   */
  amount_received: number
  /**
   * The total amount that was returned to the customer. The amount returned is expressed in the source's currency.
   */
  amount_returned: number
}

export interface SourceRedirectFlow {
  /**
   * The failure reason for the redirect, either `user_abort` (the customer aborted or dropped out of the redirect flow), `declined` (the authentication failed or the transaction was declined), or `processing_error` (the redirect failed due to a technical error). Present only if the redirect status is `failed`.
   */
  failure_reason?: string | null
  /**
   * The URL you provide to redirect the customer to after they authenticated their payment.
   */
  return_url: string
  /**
   * The status of the redirect, either `pending` (ready to be used by your customer to authenticate the transaction), `succeeded` (succesful authentication, cannot be reused) or `not_required` (redirect should not be used) or `failed` (failed authentication, cannot be reused).
   */
  status: string
  /**
   * The URL provided to you to redirect a customer to as part of a `redirect` authentication flow.
   */
  url: string
}

export interface SourceTransaction {
  ach_credit_transfer?: { account_number?: string | null, bank_name?: string | null, fingerprint?: string | null, routing_number?: string | null, swift_code?: string | null }
  ach_debit?: { bank_name?: string | null, country?: string | null, fingerprint?: string | null, last4?: string | null, routing_number?: string | null, type?: string | null }
  alipay?: { data_string?: string | null, native_url?: string | null, statement_descriptor?: string | null }
  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the amount your customer has pushed to the receiver.
   */
  amount: number
  bancontact?: { bank_code?: string | null, bank_name?: string | null, bic?: string | null, iban_last4?: string | null, preferred_language?: string | null, statement_descriptor?: string | null }
  card?: { address_line1_check?: string | null, address_zip_check?: string | null, brand?: string | null, card_automatically_updated?: boolean, country?: string | null, cvc_check?: string | null, dynamic_last4?: string | null, exp_month?: number | null, exp_year?: number | null, fingerprint?: string, funding?: string | null, last4?: string | null, name?: string | null, skip_validation?: boolean, three_d_secure?: string, tokenization_method?: string | null }
  card_present?: { application_cryptogram?: string, application_preferred_name?: string, authorization_response_code?: string, brand?: string | null, card_automatically_updated?: boolean, country?: string | null, cvm_type?: string, data_type?: string | null, dedicated_file_name?: string, emv_auth_data?: string, evidence_customer_signature?: string | null, evidence_transaction_certificate?: string | null, exp_month?: number | null, exp_year?: number | null, fingerprint?: string, funding?: string | null, last4?: string | null, mid?: string, pos_device_id?: string | null, pos_entry_mode?: string, read_method?: string | null, reader?: string | null, terminal_verification_results?: string, tid?: string, transaction_status_information?: string }
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  eps?: { reference?: string | null, statement_descriptor?: string | null }
  giropay?: { bank_code?: string | null, bank_name?: string | null, bic?: string | null, statement_descriptor?: string | null }
  /**
   * Unique identifier for the object.
   */
  id: string
  ideal?: { bank?: string | null, bic?: string | null, iban_last4?: string | null, statement_descriptor?: string | null }
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  multibanco?: { entity?: string | null, reference?: string | null, refund_account_holder_address_city?: string | null, refund_account_holder_address_country?: string | null, refund_account_holder_address_line1?: string | null, refund_account_holder_address_line2?: string | null, refund_account_holder_address_postal_code?: string | null, refund_account_holder_address_state?: string | null, refund_account_holder_name?: string | null, refund_iban?: string | null }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "source_transaction"
  p24?: { reference?: string | null }
  paper_check?: { mailing_address_city?: string | null, mailing_address_country?: string | null, mailing_address_line1?: string | null, mailing_address_line2?: string | null, mailing_address_postal_code?: string | null, mailing_address_state?: string | null }
  sepa_credit_transfer?: { bank_name?: string | null, bic?: string | null, iban?: string | null, refund_account_holder_address_city?: string | null, refund_account_holder_address_country?: string | null, refund_account_holder_address_line1?: string | null, refund_account_holder_address_line2?: string | null, refund_account_holder_address_postal_code?: string | null, refund_account_holder_address_state?: string | null, refund_account_holder_name?: string | null, refund_iban?: string | null }
  sepa_debit?: { bank_code?: string | null, branch_code?: string | null, country?: string | null, fingerprint?: string | null, last4?: string | null, mandate_reference?: string | null, mandate_url?: string | null, skip_validation?: boolean }
  sofort?: { bank_code?: string | null, bank_name?: string | null, bic?: string | null, country?: string | null, iban_last4?: string | null, preferred_language?: string | null, statement_descriptor?: string | null }
  /**
   * The ID of the source this transaction is attached to.
   */
  source: string
  three_d_secure?: { authenticated?: boolean | null, card?: string | null, customer?: string | null }
  /**
   * The type of source this transaction is attached to.
   */
  type: "ach_credit_transfer" | "ach_debit" | "alipay" | "bancontact" | "card" | "card_present" | "eps" | "giropay" | "ideal" | "multibanco" | "p24" | "paper_check" | "sepa_credit_transfer" | "sepa_debit" | "sofort" | "three_d_secure"
}

export interface StatusTransitions {
  canceled?: number | null
  fulfiled?: number | null
  paid?: number | null
  returned?: number | null
}

export interface SubscriptionItemList {
  data: (SubscriptionItem)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface Subscription {
  /**
   * A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice subtotal that will be transferred to the application owner's Stripe account.
   */
  application_fee_percent?: number | null
  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this subscription at the end of the cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions.
   */
  billing?: "charge_automatically" | "send_invoice" | null
  /**
   * Determines the date of the first full invoice, and, for plans with `month` or `year` intervals, the day of the month for subsequent invoices.
   */
  billing_cycle_anchor?: number | null
  /**
   * If the subscription has been canceled with the `at_period_end` flag set to `true`, `cancel_at_period_end` on the subscription will be true. You can use this attribute to determine whether a subscription that has a status of active is scheduled to be canceled at the end of the current period.
   */
  cancel_at_period_end: boolean
  /**
   * If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
   */
  canceled_at?: number | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
   */
  current_period_end?: number | null
  /**
   * Start of the current period that the subscription has been invoiced for.
   */
  current_period_start?: number | null
  /**
   * ID of the customer who owns the subscription.
   */
  customer: string | Customer | DeletedCustomer
  /**
   * Number of days a customer has to pay invoices generated by this subscription. This value will be `null` for subscriptions where `billing=charge_automatically`.
   */
  days_until_due?: number | null
  /**
   * Describes the current discount applied to this subscription, if there is one. When billing, a discount applied to a subscription overrides a discount applied on a customer-wide basis.
   */
  discount?: Discount | null
  /**
   * If the subscription has ended, the date the subscription ended.
   */
  ended_at?: number | null
  /**
   * Unique identifier for the object.
   */
  id: string
  items?: SubscriptionItemList
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "subscription"
  /**
   * Hash describing the plan the customer is subscribed to.
   */
  plan?: Plan | null
  /**
   * The quantity of the plan to which the customer should be subscribed. For example, if your plan is $10/user/month, and your customer has 5 users, you could pass 5 as the quantity to have the customer charged $50 (5 x $10) monthly.
   */
  quantity?: number | null
  /**
   * Date the most recent update to this subscription started.
   */
  start: number
  /**
   * Possible values are `trialing`, `active`, `past_due`, `canceled`, or `unpaid`. A subscription still in its trial period is `trialing` and moves to `active` when the trial period is over. If subscription `billing=charge_automatically` it becomes `past_due` when payment to renew it fails and `canceled` or `unpaid` (depending on your subscriptions settings) when Stripe has exhausted all payment retry attempts. If subscription `billing=send_invoice` it becomes `past_due` when its invoice is not paid by the due date, and `canceled` or `unpaid` if it is still not paid by an additional deadline after that. Note that when a subscription has a status of `unpaid`, no subsequent invoices will be attempted (invoices will be created, but then immediately automatically closed.) After receiving updated payment information from a customer, you may choose to reopen and pay their closed invoices.
   */
  status: "active" | "canceled" | "past_due" | "trialing" | "unpaid"
  /**
   * If provided, each invoice created by this subscription will apply the tax rate, increasing the amount billed to the customer.
   */
  tax_percent?: number | null
  /**
   * If the subscription has a trial, the end of that trial.
   */
  trial_end?: number | null
  /**
   * If the subscription has a trial, the beginning of that trial.
   */
  trial_start?: number | null
}

export interface SubscriptionItem {
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "subscription_item"
  plan: Plan
  /**
   * The [quantity](/docs/subscriptions/quantities) of the plan to which the customer should be subscribed.
   */
  quantity?: number
  /**
   * The `subscription` this `subscription_item` belongs to.
   */
  subscription: string
}

export interface TaxRateTemplate {
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "tax_rate_template"
}

export interface ThreeDSecure {
  amount: number
  /**
   * True if the cardholder went through the authentication flow and their bank indicated that authentication succeeded.
   */
  authenticated: boolean
  card: Card
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "three_d_secure"
  /**
   * If present, this is the URL that you should send the cardholder to for authentication. If you are going to use Stripe.js to display the authentication page in an iframe, you should use the value "_callback".
   */
  redirect_url?: string | null
  /**
   * Possible values are `redirect_pending`, `succeeded`, or `failed`. When the cardholder can be authenticated, the object starts with status `redirect_pending`. When liability will be shifted to the cardholder's bank (either because the cardholder was successfully authenticated, or because the bank has not implemented 3D Secure, the object wlil be in status `succeeded`. `failed` indicates that authentication was attempted unsuccessfully.
   */
  status: string
}

export interface Token {
  bank_account?: TokenBankAccount
  card?: TokenCard
  /**
   * IP address of the client that generated the token.
   */
  client_ip?: string | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "token"
  /**
   * Type of the token: `account`, `bank_account`, `card`, or `pii`.
   */
  type: string
  /**
   * Whether this token has already been used (tokens can be used only once).
   */
  used: boolean
}

export interface TokenBankAccount {
  /**
   * The name of the person or business that owns the bank account.
   */
  account_holder_name?: string | null
  /**
   * The type of entity that holds the account. This can be either `individual` or `company`.
   */
  account_holder_type?: string | null
  /**
   * Name of the bank associated with the routing number (e.g., `WELLS FARGO`).
   */
  bank_name?: string | null
  /**
   * Two-letter ISO code representing the country the bank account is located in.
   */
  country: string
  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid out to the bank account.
   */
  currency: string
  /**
   * Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.
   */
  fingerprint?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  last4: string
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "bank_account"
  /**
   * The routing transit number for the bank account.
   */
  routing_number?: string | null
  /**
   * Possible values are `new`, `validated`, `verified`, `verification_failed`, or `errored`. A bank account that hasn't had any activity or validation performed is `new`. If Stripe can determine that the bank account exists, its status will be `validated`. Note that there often isn’t enough information to know (e.g., for smaller credit unions), and the validation is not always run. If customer bank account verification has succeeded, the bank account status will be `verified`. If the verification failed for any reason, such as microdeposit failure, the status will be `verification_failed`. If a transfer sent to this bank account fails, we'll set the status to `errored` and will not continue to send transfers until the bank details are updated.
   */
  status: string
}

export interface TokenCard {
  /**
   * City/District/Suburb/Town/Village.
   */
  address_city?: string | null
  /**
   * Billing address country, if provided when creating card.
   */
  address_country?: string | null
  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  address_line1?: string | null
  /**
   * If `address_line1` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  address_line1_check?: string | null
  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  address_line2?: string | null
  /**
   * State/County/Province/Region.
   */
  address_state?: string | null
  /**
   * ZIP or postal code.
   */
  address_zip?: string | null
  /**
   * If `address_zip` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  address_zip_check?: string | null
  /**
   * Card brand. Can be `American Express`, `Diners Club`, `Discover`, `JCB`, `MasterCard`, `UnionPay`, `Visa`, or `Unknown`.
   */
  brand: string
  /**
   * Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you've collected.
   */
  country?: string | null
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency?: string
  /**
   * If a CVC was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  cvc_check?: string | null
  /**
   * (For tokenized numbers only.) The last four digits of the device account number.
   */
  dynamic_last4?: string | null
  /**
   * Two-digit number representing the card's expiration month.
   */
  exp_month: number
  /**
   * Four-digit number representing the card's expiration year.
   */
  exp_year: number
  /**
   * Uniquely identifies this particular card number. You can use this attribute to check whether two customers who've signed up with you are using the same card number, for example.
   */
  fingerprint?: string | null
  /**
   * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
   */
  funding: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * The last four digits of the card.
   */
  last4: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * Cardholder name.
   */
  name?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "card"
  /**
   * If the card number is tokenized, this is the method that was used. Can be `apple_pay` or `android_pay`.
   */
  tokenization_method?: string | null
}

export interface Topup {
  /**
   * Amount transferred, in %s.
   */
  amount: number
  /**
   * ID of the balance transaction that describes the impact of this top-up on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * Date the funds are expected to arrive in your Stripe account for payouts. This factors in delays like weekends or bank holidays.
   */
  expected_availability_date?: number | null
  /**
   * Error code explaining reason for top up failure if available (see [the errors section](/docs/api#errors) for a list of codes).
   */
  failure_code?: string | null
  /**
   * Message to user further explaining reason for top up failure if available.
   */
  failure_message?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "topup"
  source: Source
  /**
   * Extra information about a top-up. This will appear on your source's bank statement. It must contain at least one letter.
   */
  statement_descriptor?: string | null
  /**
   * The status of the top-up is either `canceled`, `failed`, `pending`, `reversed`, or `succeeded`.
   */
  status: "canceled" | "failed" | "pending" | "reversed" | "succeeded"
}

export interface TransferReversalList {
  data: (TransferReversal)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface Transfer {
  /**
   * Amount in %s to be transferred.
   */
  amount: number
  /**
   * Amount in %s reversed (can be less than the amount attribute on the transfer if a partial reversal was issued).
   */
  amount_reversed: number
  /**
   * Balance transaction that describes the impact of this transfer on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * Time that this record of the transfer was first created.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  /**
   * ID of the Stripe account the transfer was sent to.
   */
  destination?: string | Account | null
  /**
   * If the destination is a Stripe account, this will be the ID of the payment that the destination account received for the transfer.
   */
  destination_payment?: string | Charge
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * A set of key/value pairs that you can attach to a transfer object. It can be useful for storing additional information about the transfer in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "transfer"
  /**
   * A list of reversals that have been applied to the transfer.
   */
  reversals: TransferReversalList
  /**
   * Whether the transfer has been fully reversed. If the transfer is only partially reversed, this attribute will still be false.
   */
  reversed: boolean
  /**
   * ID of the charge or payment that was used to fund the transfer. If null, the transfer was funded from the available balance.
   */
  source_transaction?: string | Charge | null
  /**
   * The source balance this transfer came from. One of `card`, `bank_account`, or `alipay_account`.
   */
  source_type?: string | null
  /**
   * A string that identifies this transaction as part of a group. See the [Connect documentation](/docs/connect/charges-transfers#grouping-transactions) for details.
   */
  transfer_group?: string | null
}

export interface CardList {
  data: (Card)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface TransferRecipient {
  /**
   * Hash describing the current account on the recipient, if there is one.
   */
  active_account?: BankAccount | null
  cards?: CardList | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * The default card to use for creating transfers to this recipient.
   */
  default_card?: string | Card | null
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  email?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * The ID of the [Custom account](/docs/connect/custom-accounts) this recipient was migrated to. If set, the recipient can no longer be updated, nor can transfers be made to it: use the Custom account instead.
   */
  migrated_to?: string | Account | null
  /**
   * Full, legal name of the recipient.
   */
  name?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "recipient"
  rolled_back_from?: string | Account
  /**
   * Type of the recipient, one of `individual` or `corporation`.
   */
  type: string
}

export interface TransferReversalList {
  data: (TransferReversal)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface TransferRecipientTransfer {
  /**
   * Amount (in %s) to be transferred to your bank account.
   */
  amount: number
  /**
   * Amount in %s reversed (can be less than the amount attribute on the transfer if a partial reversal was issued).
   */
  amount_reversed: number
  application_fee?: string | BackwardsCompatiblePlatformEarning | null
  /**
   * Returns `true` if the payout was created by an [automated payout schedule](/docs/payouts#payout-schedule), and `false` if it was [requested manually](https://stripe.com/docs/payouts#manual-payouts).
   */
  automatic: boolean
  /**
   * Balance transaction that describes the impact of this transfer on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Date the transfer is scheduled to arrive in the bank. This factors in delays like weekends or bank holidays.
   */
  date: number
  /**
   * Internal-only description of the transfer.
   */
  description?: string | null
  /**
   * ID of the bank account, card, or Stripe account the transfer was sent to.
   */
  destination?: string | Account | BankAccount | Card | null
  /**
   * If the destination is a Stripe account, this will be the ID of the payment that the destination account received for the transfer.
   */
  destination_payment?: string | Charge
  /**
   * Error code explaining reason for transfer failure if available. See [Types of transfer failures](/docs/api#transfer_failures) for a list of failure codes.
   */
  failure_code?: string | null
  /**
   * Message to user further explaining reason for transfer failure if available.
   */
  failure_message?: string | null
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * The method used to send this transfer, which can be `standard` or `instant`. `instant` is only supported for transfers to debit cards. (See [Instant payouts for marketplaces](/blog/instant-payouts-for-marketplaces) for more information.)
   */
  method?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "recipient_transfer"
  /**
   * A list of reversals that have been applied to the transfer.
   */
  reversals: TransferReversalList
  /**
   * Whether the transfer has been fully reversed. If the transfer is only partially reversed, this attribute will still be false.
   */
  reversed: boolean
  /**
   * ID of the charge (or other transaction) that was used to fund the transfer. If null, the transfer was funded from the available balance.
   */
  source_transaction?: string | Charge | PlatformFee | TransferReversal | null
  /**
   * The source balance this transfer came from. One of `card`, `bank_account`, or `alipay_account`.
   */
  source_type?: string | null
  /**
   * Extra information about a transfer to be displayed on the user's bank statement.
   */
  statement_descriptor?: string | null
  /**
   * Current status of the transfer (`paid`, `pending`, `in_transit`, `canceled` or `failed`). A transfer will be `pending` until it is submitted to the bank, at which point it becomes `in_transit`. It will then change to `paid` if the transaction goes through. If it does not go through successfully, its status will change to `failed` or `canceled`.
   */
  status: string
  /**
   * A string that identifies this transaction as part of a group. See the [Connect documentation](/docs/connect/charges-transfers#grouping-transactions) for details.
   */
  transfer_group?: string | null
  /**
   * Can be `card`, `bank_account`, or `stripe_account`.
   */
  type: string
}

export interface TransferReversal {
  /**
   * Amount, in %s.
   */
  amount: number
  /**
   * Balance transaction that describes the impact on your account balance.
   */
  balance_transaction?: string | BalanceTransaction | null
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: { [key: string]: string }
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "transfer_reversal"
  /**
   * ID of the transfer that was reversed.
   */
  transfer: string | Transfer
}

export interface TransferSchedule {
  /**
   * The number of days charges for the account will be held before being paid out.
   */
  delay_days: number
  /**
   * How frequently funds will be paid out. One of `manual` (transfers only created via API call), `daily`, `weekly`, or `monthly`.
   */
  interval: string
  /**
   * The day of the month funds will be paid out. Only shown if `interval` is monthly. Payouts scheduled between 29-31st of the month are sent on the last day of shorter months.
   */
  monthly_anchor?: number
  /**
   * The day of the week funds will be paid out, of the style 'monday', 'tuesday', etc. Only shown if `interval` is weekly.
   */
  weekly_anchor?: string
}

export interface TransformUsage {
  /**
   * Divide usage by this number.
   */
  divide_by: number
  /**
   * After division, either round the result `up` or `down`.
   */
  round: "down" | "up"
}

export interface InvoiceLinesList {
  data: (InvoiceLineItem)[]
  /**
   * True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: "list"
  /**
   * The URL where this list can be accessed.
   */
  url: string
}

export interface UpcomingInvoice {
  /**
   * Final amount due at this time for this invoice. If the invoice's total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`.
   */
  amount_due: number
  /**
   * The amount, in %s, that was paid.
   */
  amount_paid: number
  /**
   * The amount remaining, in %s, that is due.
   */
  amount_remaining: number
  /**
   * The fee in %s that will be applied to the invoice and transferred to the application owner's Stripe account when the invoice is paid.
   */
  application_fee?: number | null
  /**
   * Number of payment attempts made for this invoice, from the perspective of the payment retry schedule. Any payment attempt counts as the first attempt, and subsequently only automatic retries increment the attempt count. In other words, manual payment attempts after the first attempt do not affect the retry schedule.
   */
  attempt_count: number
  /**
   * Whether an attempt has been made to pay the invoice. An invoice is not attempted until 1 hour after the `invoice.created` webhook, for example, so you might not want to display that invoice as unpaid to your users.
   */
  attempted: boolean
  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this invoice using the default source attached to the customer. When sending an invoice, Stripe will email this invoice to the customer with payment instructions.
   */
  billing?: "charge_automatically" | "send_invoice" | null
  /**
   * Indicates the reason why the invoice was created. `subscription_cycle` indicates an invoice created by a subscription advancing into a new period. `subscription_update` indicates an invoice created due to creating or updating a subscription. `subscription` is set for all old invoices to indicate either a change to a subscription or a period advancement. `manual` is set for all invoices unrelated to a subscription (for example: created via the invoice editor). The `upcoming` value is reserved for simulated invoices per the upcoming invoice endpoint.
   */
  billing_reason?: "manual" | "subscription" | "subscription_cycle" | "subscription_threshold" | "subscription_update" | "upcoming" | null
  /**
   * ID of the latest charge generated for this invoice, if any.
   */
  charge?: string | Charge | null
  /**
   * Whether the invoice is still trying to collect payment. An invoice is closed if it's either paid or it has been marked closed. A closed invoice will no longer attempt to collect payment.
   */
  closed: boolean
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string
  customer: string | Customer | DeletedCustomer
  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  date: number
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description?: string | null
  discount?: Discount | null
  /**
   * The date on which payment for this invoice is due. This value will be `null` for invoices where `billing=charge_automatically`.
   */
  due_date?: number | null
  /**
   * Ending customer balance after the invoice is frozen. Invoices are frozen approximately an hour after successful webhook delivery or when payment collection is attempted for the invoice. If the invoice has not been frozen yet, this will be null.
   */
  ending_balance?: number | null
  /**
   * Whether the invoice has been forgiven. Forgiving an invoice instructs us to update the subscription status as if the invoice were successfully paid. Once an invoice has been forgiven, it cannot be unforgiven or reopened.
   */
  forgiven: boolean
  /**
   * The individual line items that make up the invoice. `lines` is sorted as follows: invoice items in reverse chronological order, followed by the subscription, if any.
   */
  lines: InvoiceLinesList
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata?: { [key: string]: string } | null
  /**
   * The time at which payment will next be attempted. This value will be `null` for invoices where `billing=send_invoice`.
   */
  next_payment_attempt?: number | null
  /**
   * A unique, identifying string that appears on emails sent to the customer for this invoice. This starts with the customer's unique invoice_prefix if it is specified.
   */
  number?: string | null
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "invoice"
  /**
   * Whether payment was successfully collected for this invoice. An invoice can be paid (most commonly) with a charge or with credit from the customer's account balance.
   */
  paid: boolean
  /**
   * End of the usage period during which invoice items were added to this invoice.
   */
  period_end: number
  /**
   * Start of the usage period during which invoice items were added to this invoice.
   */
  period_start: number
  /**
   * This is the transaction number that appears on email receipts sent for this invoice.
   */
  receipt_number?: string | null
  /**
   * Starting customer balance before the invoice is frozen. If the invoice has not been frozen yet, this will be the current customer balance.
   */
  starting_balance: number
  /**
   * Extra information about an invoice for the customer's credit card statement.
   */
  statement_descriptor?: string | null
  /**
   * The subscription that this invoice was prepared for, if any.
   */
  subscription?: string | Subscription | null
  /**
   * Only set for upcoming invoices that preview prorations. The time used to calculate prorations.
   */
  subscription_proration_date?: number
  /**
   * Total of all subscriptions, invoice items, and prorations on the invoice before any discount is applied.
   */
  subtotal: number
  /**
   * The amount of tax included in the total, calculated from `tax_percent` and the subtotal. If no `tax_percent` is defined, this value will be null.
   */
  tax?: number | null
  /**
   * This percentage of the subtotal has been added to the total amount of the invoice, including invoice line items and discounts. This field is inherited from the subscription's `tax_percent` field, but can be changed before the invoice is paid. This field defaults to null.
   */
  tax_percent?: number | null
  /**
   * Total after discount.
   */
  total: number
  /**
   * The time at which webhooks for this invoice were successfully delivered (if the invoice had no webhooks to deliver, this will match `date`). Invoice payment is delayed until webhooks are delivered, or until all webhook delivery attempts have been exhausted.
   */
  webhooks_delivered_at?: number | null
}

export interface UsageRecord {
  /**
   * Unique identifier for the object.
   */
  id: string
  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean
  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "usage_record"
  /**
   * The usage quantity for the specified date.
   */
  quantity: number
  /**
   * The ID of the subscription item this usage record contains data for.
   */
  subscription_item: string
  /**
   * The timestamp when this usage occurred.
   */
  timestamp: number
}
