class ErrorHandler {
  handleError = async (error: any): Promise<boolean> => {
    return this.isOperationalError(error)
  }

  isOperationalError = (error: any) => {
    return error.isOperational
  }
}

export default new ErrorHandler()
