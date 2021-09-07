import { baseAPI } from '../api/base'
import { BaseRepository } from './BaseRepository'

interface CustomFormData extends FormData {
  append(title: string, psdFile:any):void
}

export class PSDRepository extends BaseRepository<CustomFormData> {
  get baseEndpoint() {
    return '/api/posts'
  }

  async create(data:CustomFormData) {
    try {
      return await baseAPI({
        endpoint: this.baseEndpoint,
        method: 'POST',
        body:data
      })      
    } catch (err) {
      return err
    }
  }

  async all() {
    return await baseAPI<any>({
      endpoint: this.baseEndpoint,
    })
  }
  
  async show(id:string) {
    return await baseAPI<any>({
      endpoint: `${this.baseEndpoint}/${id}`,
    })
  }


  async delete(id:number) {
    try {
      return await baseAPI({ endpoint: `${this.baseEndpoint}/${id}`, method: 'DELETE' })      
    } catch (err) {
      return err
    }
  }
}