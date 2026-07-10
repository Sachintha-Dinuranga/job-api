import mongoose from "mongoose";
import validator from "validator";
import slugify from "slugify";
import geocoder from "../utils/geocoder.js";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter job title."],
    trim: true, // help to remove blank spaces
    maxLength: [100, "Job title can not exceed 100 characters."],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Please enter job description"],
    maxlength: [1000, "Job description can not exceed 1000 characters"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please add a valid email addrress"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    // Generate latitude, longitude, zip code based on the address user provide
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  company: {
    type: String,
    required: [true, "Please add company name"],
  },
  industry: {
    type: [String],
    required: true,
    enum: {
      values: [
        "Business",
        "Information Technology",
        "Banking",
        "Education/Training",
        "Telecommunication",
        "Others",
      ],
      message: "Please select correct options for industry",
    }, // User must have to select from this values
  },
  jobType: {
    type: String,
    required: true,
    enum: {
      values: ["Permanent", "Temporary", "Internship"],
      message: "Please select correct options for industry",
    },
  },
  minEducation: {
    type: String,
    required: true,
    enum: {
      values: ["Bachelors", "Masters", "Phd"],
      message: "Please select correct options for education.",
    },
  },
  positions: {
    type: Number,
    default: 1,
  },
  experience: {
    type: String,
    required: true,
    enum: {
      values: [
        "No experience",
        "1 Year - 2 Years",
        "2 Year - 5 Years",
        "5 Years+",
      ],
      message: "Please select correct option for experience.",
    },
  },
  salary: {
    type: Number,
    required: [true, "Please enter expected salary for this job."],
  },
  postingDate: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
  },
  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

//Creating job slug before saving
jobSchema.pre("save", async function () {
  // creating slug for saving to db
  this.slug = slugify(this.title, { lower: true });
});

// setting up location using geocoder
jobSchema.pre("save", async function (next) {
  const res = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [res[0].longitude, res[0].latitude],
    formattedAddress: res[0].formattedAddress,
    city: res[0].city,
    state: res[0].stateCode,
    zipcode: res[0].zipcode,
    country: res[0].countryCode,
  };
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
