"use client";

import { handleDeleteCar } from "@/lib/action/delete";
import { Button, Modal } from "@heroui/react";
import { AlertCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation"; // useRouter ইম্পোর্ট করলাম

export function ConfirmDelete({ car }) {
  const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করলাম

  const handleDelete = async () => {
    try {
      await handleDeleteCar(car._id);
      
  
      router.refresh(); 
      
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <Modal>
      <Button 
        title="Delete Car"
        className="p-2 text-blue-600 bg-transparent rounded-md hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <AlertCircle />
              </Modal.Icon>
              <Modal.Heading>Confirmation Alert</Modal.Heading>
            </Modal.Header>
            
            <Modal.Body>
              <p>
                Are You Sure! You Wanna Delete{" "}
                <span className="text-blue-600 font-bold">{car.title}</span>{" "}
                Permanently?
              </p>
            </Modal.Body>
            
            <Modal.Footer>
              <Button 
                className="w-full" 
                slot="close"
                onPress={handleDelete}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}