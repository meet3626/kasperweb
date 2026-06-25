import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from "@/components/ui/use-toast";
import { Loader2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const ContactInfoCard = ({ icon: Icon, title, lines, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass p-6 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-colors group flex gap-4 items-start"
  >
    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent-cyan/10 group-hover:border-accent-cyan/30 transition-all duration-300">
      <Icon size={20} className="text-gray-400 group-hover:text-accent-cyan transition-colors" />
    </div>
    <div>
      <h3 className="uppercase text-sm font-bold text-white mb-2 tracking-widest">{title}</h3>
      <div className="space-y-1">
        {lines.map((line, index) => <p key={index} className="text-gray-400 font-light text-sm">{line}</p>)}
      </div>
    </div>
  </motion.div>
);

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send to backend
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Contact Page',
          name: data.contact_name_field,
          email: data.contact_email_field,
          phone: data.contact_phone_field,
          message: data.message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "Message Sent! 🚀",
        description: "We've received your request and will be in touch shortly.",
      });
      reset();

    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to process your request.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }} className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <Helmet>
        <title>Contact Sales | KAPSERFX IT SOLUTIONS</title>
      </Helmet>

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-purple/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-semibold uppercase tracking-widest text-accent-cyan mb-8">
              <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
              Get In Touch
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple italic font-light">Launch?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-12 font-light leading-relaxed">
              Partner with the industry leader in brokerage technology. Drop us a message and our institutional sales team will be in touch shortly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <ContactInfoCard icon={Mail} title="Email Us" lines={["enquiry@kapserfx.com", "sales@kapserfx.com"]} delay={0.4} />
              <ContactInfoCard icon={Phone} title="Call Us" lines={["+971 56 879 5828", "Mon-Fri, 9am-6pm (GST)"]} delay={0.5} />
              <div className="sm:col-span-2">
                <ContactInfoCard icon={MapPin} title="Headquarters" lines={["Office 2807, Churchill Executive Tower", "Business Bay, Dubai, United Arab Emirates"]} delay={0.6} />
              </div>
            </div>
          </motion.div>

          {/* Right Column (Form) */}
          <motion.div
            className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px] pointer-events-none -mr-32 -mt-32"></div>

            <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Send a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    type="text"
                    {...register("contact_name_field", { required: "Name is required" })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all"
                    placeholder="John Doe"
                  />
                  {errors.contact_name_field && <span className="text-red-400 text-xs mt-1 block">{errors.contact_name_field.message}</span>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                  <input
                    type="tel"
                    {...register("contact_phone_field", {
                      required: "Phone is required",
                      pattern: { value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/, message: "Invalid phone number" }
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.contact_phone_field && <span className="text-red-400 text-xs mt-1 block">{errors.contact_phone_field.message}</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Business Email</label>
                <input
                  type="email"
                  {...register("contact_email_field", {
                    required: "Email is required",
                    pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email address" }
                  })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all"
                  placeholder="john@company.com"
                />
                {errors.contact_email_field && <span className="text-red-400 text-xs mt-1 block">{errors.contact_email_field.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Project Requirements</label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all resize-none"
                  placeholder="Tell us about your brokerage goals..."
                ></textarea>
                {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold text-sm uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" /> Processing...</> : <>Submit Request <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;