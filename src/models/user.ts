export interface User {
  /**
   * id
   * @minimum 0
   * @type integer
   */
  id: number
  name: string
  password: string
  description: string
}