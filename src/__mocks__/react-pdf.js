// Mock for react-pdf to handle Jest testing
export const Document = ({ children, ...props }) => children;
export const Page = ({ children, ...props }) => children;

export const pdfjs = {
  GlobalWorkerOptions: {
    workerSrc: ''
  }
};