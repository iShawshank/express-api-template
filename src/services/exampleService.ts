import { ExampleCard, ExampleDetail } from '../interfaces/joi-types/example'

/**
 * ExampleService provides methods to interact with example data.
 * This service simulates fetching example data, which could be from a database or an external API.
 * It includes methods to get an example by ID and to search for examples by their IDs.
 * @param id - The ID of the example to retrieve.
 * @returns A promise that resolves to an ExampleDetail object containing the example's details.
 */
export default class ExampleService {
  public static async getExampleById(id: string, brand: string): Promise<ExampleDetail> {
    return {
      id,
      name: 'Example Name',
      brand: brand,
      image: 'https://example.com/image.jpg',
    }
  }

  /**
   * Searches for examples by their IDs.
   * This is a placeholder implementation that simulates fetching examples.
   * In a real application, this would likely involve a database query or an API call.
   * @param ids
   * @returns Promise that resolves to an array of ExampleCard objects.
   */
  public static async searchExamplesByIds(
    ids: string[]
  ): Promise<ExampleCard[]> {
    return ids.map((id) => ({
      id,
      name: `Example Name for ${id}`,
      brand: 'IAM',
    }))
  }
}
