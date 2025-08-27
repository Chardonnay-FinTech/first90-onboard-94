import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientProfileForm } from "./ClientProfileForm";

interface ClientProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId?: string;
  userRole: 'advisor' | 'assistant' | 'client';
  onSave?: (data: any) => void;
  onSend?: (data: any) => void;
}

export const ClientProfileFormModal = ({
  isOpen,
  onClose,
  clientId,
  userRole,
  onSave,
  onSend
}: ClientProfileFormModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {clientId && clientId !== 'new' ? 'Edit Client Profile' : 'Create New Client'}
          </DialogTitle>
        </DialogHeader>
        <ClientProfileForm
          clientId={clientId}
          userRole={userRole}
          isEditing={true}
          onSave={(data) => {
            onSave?.(data);
            onClose();
          }}
          onSend={(data) => {
            onSend?.(data);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};