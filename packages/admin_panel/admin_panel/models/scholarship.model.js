import mongoose from 'mongoose';

const ScholarFormSchema = new mongoose.Schema(
  {
    basic_details: {
      full_name: { type: String, required: true },
      gender: { type: String, enum: ['male', 'female', 'Other'], required: true },
      mobile_number: { type: String, required: true },
      email: { type: String, required: true },
      domicile: { type: String, required: true },
    },
    program_applied_for: {
      type: String,
      enum: ['mbbs', 'nursing', 'pharma'],
      required: true,
    },
    academic_details: {
      mbbs: {
        rank: { type: String },
        roll_number: { type: String },
        plustwo_boardname: { type: String },
        yop: { type: Number },
        pcb_and_english_percentage: { type: Number },
      },
      bsc_nusrsing_or_bsc_parama: {
        twelth_board: { type: String },
        yop: { type: Number },
        subjects: [{ type: String }],
        twelth_percentage: { type: Number },
      },
    },
    domicile_verification: {
      domicile_state: { type: String, required: true },
      domicile_attatchment: { type: String, required: true },
    },
    socioEconomicDetails: {
      annualFamilyIncome: {
        income: { type: Number },
        income_cert_attachment: { type: String },
      },
      parent_occupation: { type: String },
      proof_of_economic_hardShip: {
        proofs: [
          {
            name: { type: String },
            attachment: { type: String },
          },
        ],
        count: { type: Number },
      },
      additional_consideration: [
        {
          name: { type: String },
        },
      ],
    },
    declaration: {
      terms_accepted: { type: Boolean, required: true },
      submitted_at: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export const Scholarship = mongoose.model('scholar-forms', ScholarFormSchema);
