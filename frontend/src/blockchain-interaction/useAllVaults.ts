const useAllVaults = () => {
  const allVaults = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/get-all-vaults/"
    );

    const data = await response.json();

    if (response.status === 201) {
      console.log("vaults ", data);
    }
  };

  return { allVaults };
};

export default useAllVaults;
