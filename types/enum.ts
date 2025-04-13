export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export enum SubscriptionPlan {
  BASIC = "BASIC",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  PAUSED = "PAUSED",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  PAYPAL = "PAYPAL",
  CRYPTO = "CRYPTO",
}

export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}
