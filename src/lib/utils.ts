import { categoryJobType, CompanyType, JobType, optionType } from '@/types';
import bcrypt from 'bcryptjs';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { supabasePublicUrl } from './supabase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 8);

  return hashPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  return res.json() as Promise<JSON>;
}

export const parsingCategories = (
  data: any,
  isLoading: boolean,
  error: any
) => {
  if (!isLoading && !error && data) {
    return data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        totalJobs: item._count.Job,
      };
    }) as categoryJobType[];
  }

  return [];
};

export const parsingJobs = async (
  data: any,
  isLoading: boolean,
  error: any
) => {
  if (!isLoading && !error && data) {
    return await Promise.all(
      data.map(async (item: any) => {
        let imageName = item.Company?.CompanyOverview[0]?.image ?? '';
        let imageUrl;

        if (imageName) {
          imageUrl = await supabasePublicUrl(imageName, 'company');
        } else {
          imageUrl = '/images/company.png';
        }

        const job: JobType = {
          id: item.id,
          name: item.roles,
          applicants: item.applicants,
          category: item.CategoryJob,
          desc: item.description,
          jobType: item.jobType,
          image: imageUrl,
          location: item.Company?.CompanyOverview[0]?.location ?? '',
          needs: item.needs,
          type: item.CategoryJob.name,
          skills: item.requiredSkills,
        };

        return job;
      })
    );
  }

  return [];
};

export const parsingCompanies = async (
  data: any,
  isLoading: boolean,
  error: any
) => {
  if (!isLoading && !error && data) {
    return await Promise.all(
      data.map(async (item: any) => {
        let imageName = item.CompanyOverview[0]?.image;
        let imageUrl;

        if (imageName) {
          imageUrl = await supabasePublicUrl(`${imageName}`, 'company');
        } else {
          imageUrl = '/images/company.png';
        }

        const companyDetail = item.CompanyOverview[0];

        console.log('company detail', companyDetail);

        const company: CompanyType = {
          id: item.id,
          name: companyDetail?.companyName,
          image: imageUrl,
          dateFounded: companyDetail?.dateFounded,
          description: companyDetail?.description,
          employee: companyDetail?.employee,
          industry: companyDetail?.industry,
          location: companyDetail?.location,
          techStack: companyDetail?.techStack,
          website: companyDetail?.website,
          sosmed: item.CompanySocialMedia[0],
          teams: item?.CompanyTeam,
          totalJobs: item._count.Job,
        };

        return company;
      })
    );
  }

  return [];
};

export const parsingCategoriesToOptions = (
  data: any,
  isLoading: boolean,
  error: any,
  isIndustry?: boolean
) => {
  if (!isLoading && !error && data) {
    return data.map((item: any) => {
      return {
        id: isIndustry ? item.name : item.id,
        label: item.name,
      } as optionType;
    }) as optionType[];
  }

  return [];
};

export const dateFormat = (
  date: Date | string,
  format: string = 'DD MMM YYYY'
) => {
  return dayjs(date).format(format);
};

export const parseCompany = async (data: any) => {
  let imageCompanyName = data.CompanyOverview[0]?.image;

  let imageCompanyUrl;

  if (imageCompanyName) {
    imageCompanyUrl = await supabasePublicUrl(`${imageCompanyName}`, 'company');
  } else {
    imageCompanyUrl = '/images/company.png';
  }

  console.log('image', imageCompanyUrl);

  const companyOverview = data.CompanyOverview[0];
  const companySocialMedia = data.CompanySocialMedia[0];
  const companyTeams = data.CompanyTeam;

  const jobs = data.Job.map((item: any) => {
    const val = {
      ...item,
      image: imageCompanyUrl,
      location: companyOverview.location,
      type: companyOverview.industry,
      category: {
        id: item.CategoryJob.id,
        name: item.CategoryJob.name,
      },
    };

    return val;
  });

  const company = {
    id: data.id,
    name: data.name,
    email: data.email,
    totalJobs: data._count?.Job,
    detail: {
      ...companyOverview,
      image: imageCompanyUrl,
    },
    socialMedia: companySocialMedia,
    teams: companyTeams,
    latestJobs: jobs,
  };

  return company;
};
