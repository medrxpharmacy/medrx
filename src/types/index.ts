export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  benefits?: string[];
  ctaText?: string;
  modalType?: 'transfer' | 'refill' | 'delivery' | 'contact';
  iconName: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  iconName: string;
}

export type ModalType = 'transfer' | 'refill' | 'delivery' | 'contact' | null;

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
  defaultSubject?: string;
}
