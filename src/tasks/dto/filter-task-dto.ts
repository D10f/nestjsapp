import { IsEnum, IsLowercase, IsOptional, IsString, MaxLength } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @IsLowercase()
  search?: string
}