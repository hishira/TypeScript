export class ModalOpenUtils {
  private static instance: ModalOpenUtils | null = null;
  closeModal: boolean = false;

  get CloseModal(): boolean {
    return this.closeModal;
  }
  set CloseModal(value: boolean) {
    this.closeModal = value;
  }
  static getInstance(): ModalOpenUtils {
    if (this.instance === null) this.instance = new ModalOpenUtils();
    return this.instance;
  }

  constructor() {}
}
