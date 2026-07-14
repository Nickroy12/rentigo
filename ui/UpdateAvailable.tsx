"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import the router hook
import { Modal, Button } from "@heroui/react";
import { Pen, Rocket } from 'lucide-react';
import { updateCarAvailability, updateRent } from '@/lib/action/action';

const UpdateAvailable = ({ car }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // 2. Initialize the router

  const handleConfirm = async () => {
    const res = await updateCarAvailability(car._id, { isAvailable: "false" });
    const result = await updateRent(car._id, { cardStatus: "true" });
    if (res && result) {
      alert('Confirm Hired');
      router.refresh(); // 3. Refresh the server data
      router.push('/dashboard/admin/management')
    }
    setIsOpen(false);
  };

  const handleReject = async () => {
    const res = await updateCarAvailability(car._id, { isAvailable: "true" });
     const result = await updateRent(car._id, { cardStatus: "false" });
    if (res && result) {
      alert('Reject Offer');
      router.refresh(); // 3. Refresh the server data
     
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button 
        onPress={() => setIsOpen(true)} 
        className="variant-light text-primary"
      >
        <Pen />
      </Button>

      {/* HeroUI v3 Compound Modal */}
      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} variant="blur">
        <Modal.Container size="sm">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            
            <Modal.Header>
              <Modal.Icon>
                <Rocket />
              </Modal.Icon>
              <Modal.Heading>Welcome to HeroUI</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p>
                A beautiful, fast, and modern React UI library for building accessible and
                customizable web applications with ease.
              </p>
            </Modal.Body>

            <Modal.Footer>
              {/* Reject Button */}
              <Button 
                color="danger"
                onPress={handleReject}
              >
                Reject
              </Button>
              
              {/* Confirm Button */}
              <Button 
                color="primary"
                onPress={handleConfirm}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
};

export default UpdateAvailable;