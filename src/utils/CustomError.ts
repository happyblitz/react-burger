type TCutsomError = {
  status: number;
  message?: string;
  data?: unknown;
};

export class CustomError extends Error {
  status: number;
  data?: unknown;

  constructor({ status, message = `HTTP Error ${status}`, data }: TCutsomError) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
