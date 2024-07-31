// src/utils/shippingUtils.js
export const getShippingStatusStages = (status) => {
    const statusStages = [
      { name: 'Processing', color: 'bg-blue-600' },
      { name: 'Shipped', color: 'bg-blue-600' },
      { name: 'In Transit', color: 'bg-blue-600' },
      { name: 'Delivered', color: 'bg-blue-600' },
    ];
 
    const stageIndex = statusStages.findIndex((stage) => stage.name === status);
  
    return statusStages.map((stage, index) => ({
      ...stage,
      isActive: index <= stageIndex,
    }));
  };
  