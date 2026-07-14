"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Label, Modal, Surface, TextField } from "@heroui/react";
import { Mail } from "lucide-react";
import { updateCarAvailability } from "@/lib/action/action";
import { createRentalBooking } from "@/lib/action/rent";

interface User {
  name?: string;
  email?: string;
  phone?: string;
}

interface CarData {
  _id: string;
  make: string;
  model: string;
  year: number;
  isAvailable: string;
}

interface WithFormProps {
  user?: User;
  carData?: CarData;
}

export function WithForm({ user, carData }: WithFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(user, "user");
  
  const inputStyles = "w-full p-2.5 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:ring-2 focus:ring-blue-500/20 rounded-lg";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      fromDestination: formData.get("fromDestination") as string,
      toDestination: formData.get("toDestination") as string,
      pickupDate: formData.get("pickupDate") as string,
      pickupTime: formData.get("pickupTime") as string,
      message: formData.get("message") as string,
      carId: carData?._id,
      cardStatus: "pending"
    };

    // 1. Create the rental booking record
    await createRentalBooking(data); 

    // 2. Update the car availability status
    if (carData?._id) {
      const res = await updateCarAvailability(carData._id, { isAvailable: "pending" });
      if (res) {
        setIsOpen(false);
        router.push("/dashboard/renter/booked");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* Trigger Button sits safely outside the Modal wrapper */}
      <Button
        onPress={() => setIsOpen(true)}
        variant="secondary"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition shadow-md shadow-blue-600/20 dark:shadow-none"
      >
        Rent This Car Now
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-lg">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Mail className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Contact Us</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Fill out the form below and we'll get back to you.
                </p>
              </Modal.Header>
              
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <TextField className="w-full" type="text" variant="secondary">
                        <Label>Name</Label>
                        <input name="name" className={inputStyles} placeholder="Enter your name" defaultValue={user?.name} required />
                      </TextField>
                      
                      <TextField className="w-full" type="email" variant="secondary">
                        <Label>Email</Label>
                        <input name="email" className={inputStyles} placeholder="Enter your email" defaultValue={user?.email} required />
                      </TextField>

                      <TextField className="w-full" type="tel" variant="secondary">
                        <Label>Phone</Label>
                        <input name="phone" className={inputStyles} placeholder="Enter your phone number" defaultValue={user?.phone} />
                      </TextField>

                      <TextField className="w-full" variant="secondary">
                        <Label>From</Label>
                        <input name="fromDestination" className={inputStyles} placeholder="Starting location" />
                      </TextField>

                      <TextField className="w-full" variant="secondary">
                        <Label>To</Label>
                        <input name="toDestination" className={inputStyles} placeholder="Drop-off location" />
                      </TextField>

                      <div className="hidden sm:block" aria-hidden="true" />

                      <TextField className="w-full" variant="secondary">
                        <Label>Pick-up Date</Label>
                        <input name="pickupDate" type="date" className={`${inputStyles} cursor-pointer min-h-[40px]`} />
                      </TextField>

                      <TextField className="w-full" variant="secondary">
                        <Label>Pick-up Time</Label>
                        <input name="pickupTime" type="time" className={`${inputStyles} cursor-pointer min-h-[40px]`} />
                      </TextField>
                    </div>

                    <TextField className="w-full" variant="secondary">
                      <Label>Message</Label>
                      <input name="message" className={inputStyles} placeholder="Enter your message" />
                    </TextField>

                    <div className="flex items-center justify-end gap-3 mt-2">
                      <Button variant="secondary" type="button" onPress={() => setIsOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700" isDisabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                </Surface>
              </Modal.Body>
              <Modal.Footer />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}