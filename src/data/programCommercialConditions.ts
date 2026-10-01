export interface CommercialConditions {
  readonly allPricesIncludeVat: true
  readonly contract: { readonly durationMonths: 12; readonly fixedFeeDuringTerm: true }
  readonly renewal: {
    readonly automatic: true
    readonly durationMonths: 12
    readonly noticeDays: 30
    readonly noticeMustBeInWriting: true
    readonly reminderBeforeRenewal: true
  }
  readonly includedHours: {
    readonly accumulateWithinContractYear: true
    readonly expireAtContractEnd: true
  }
  readonly additionalHours: { readonly hourlyRate: 60; readonly vatIncluded: true }
  readonly externalWork: { readonly requiresQuoteAndPriorApproval: true }
  readonly secondBoat: { readonly discountPercent: 10; readonly sameCustomerOnly: true }
  readonly assistance: {
    readonly remoteAvailableDaily: true
    readonly channels: readonly ['phone', 'video']
    readonly onSiteDiagnosisWithinBusinessHours: 48
  }
  readonly guarantee: {
    readonly appliesTo: readonly ['audit', 'cleaning', 'providerSolution']
    readonly maximumRepeats: 2
    readonly claimDeadlineDays: 15
    readonly claimMustBeInWriting: true
  }
  readonly withdrawal: {
    readonly periodDays: 14
    readonly periodUsesCalendarDays: true
    readonly appliesToDistanceOrOffPremisesContracts: true
    readonly contactEmail: 'info@boat-solutions.es'
    readonly refundDeadlineDays: 14
    readonly refundDeadlineStartsFrom: 'withdrawalNotice'
    readonly proportionalChargeForEarlyStart: true
    readonly rightEndsAfterFullPerformance: true
    readonly expressRequestAndAcknowledgementRequired: true
    readonly requiresLegalReview: true
  }
}

export const commercialConditions = {
  allPricesIncludeVat: true,
  contract: { durationMonths: 12, fixedFeeDuringTerm: true },
  renewal: {
    automatic: true,
    durationMonths: 12,
    noticeDays: 30,
    noticeMustBeInWriting: true,
    reminderBeforeRenewal: true,
  },
  includedHours: {
    accumulateWithinContractYear: true,
    expireAtContractEnd: true,
  },
  additionalHours: { hourlyRate: 60, vatIncluded: true },
  externalWork: { requiresQuoteAndPriorApproval: true },
  secondBoat: { discountPercent: 10, sameCustomerOnly: true },
  assistance: {
    remoteAvailableDaily: true,
    channels: ['phone', 'video'],
    onSiteDiagnosisWithinBusinessHours: 48,
  },
  guarantee: {
    appliesTo: ['audit', 'cleaning', 'providerSolution'],
    maximumRepeats: 2,
    claimDeadlineDays: 15,
    claimMustBeInWriting: true,
  },
  withdrawal: {
    periodDays: 14,
    periodUsesCalendarDays: true,
    appliesToDistanceOrOffPremisesContracts: true,
    contactEmail: 'info@boat-solutions.es',
    refundDeadlineDays: 14,
    refundDeadlineStartsFrom: 'withdrawalNotice',
    proportionalChargeForEarlyStart: true,
    rightEndsAfterFullPerformance: true,
    expressRequestAndAcknowledgementRequired: true,
    requiresLegalReview: true,
  },
} as const satisfies CommercialConditions
