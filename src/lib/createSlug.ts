export default function (title: string) {
    return (
      title
        // Normalize the string to NFD form to separate base characters from diacritical marks
        .normalize('NFD')
        // remove leading & trailing whitespace
        .trim()
        // output lowercase
         .toLowerCase()
        // replace spaces
        .replace(/\s+/g, '-')
        // remove special characters
        .replace(/[^\w-]/g, '')
        // remove leading & trailing separtors
        .replace(/^-+|-+$/g, '')
    )
  }