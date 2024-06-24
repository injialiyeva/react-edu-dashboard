import { axiosClient } from ".";

// export const postLogin = async (data) => {
//   try {
//     return axiosClient.post(
//       "meta/bases/{baseId}/users",
//       data,
//       {
//         headers: {
//           "Content-type": "application/json",
//         },
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getUniversitiesList = async (queryString) => {
  try {
    const response = await axiosClient.get(
      `tables/m2ehbo9xk7lf9u0/records?${queryString}`
    );
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSchoolsList = async (queryString) => {
  try {
    const response = await axiosClient.get(
      `tables/mjsaw7ujl7d0g6w/records?${queryString}`
    );
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getHighSchoolsList = async (queryString) => {
  try {
    const response = await axiosClient.get(
      `tables/m02p5f0v956z2sx/records?${queryString}`
    );
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUniversity = async (id) => {
  try {
    const response = await axiosClient.delete(
      `tables/m2ehbo9xk7lf9u0/records`,
      {
        data: { Id: id },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteSchool = async (id) => {
  try {
    const response = await axiosClient.delete(
      `tables/mjsaw7ujl7d0g6w/records`,
      {
        data: { Id: id },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteHighSchool = async (id) => {
  try {
    const response = await axiosClient.delete(
      `tables/m02p5f0v956z2sx/records`,
      {
        data: { Id: id },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
