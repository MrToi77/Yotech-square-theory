// utils/ReflectionUtil.ts

export class ReflectionUtil {
    /**
     * Gọi một function bằng tên và dữ liệu JSON. Hỗ trợ tự động phân tích nhiều tham số.
     */
    static callFunctionSmart(target: any, functionName: string, data: any): any {
      const fn = target[functionName];
  
      if (typeof fn !== "function") {
        throw new Error(`Function '${functionName}' not found on target.`);
      }
  
      const paramCount = fn.length;
  
      // Nếu chỉ có 1 tham số hoặc data không phải object, gọi trực tiếp
      if (paramCount === 1 || typeof data !== "object" || Array.isArray(data)) {
        return fn.call(target, data);
      }
  
      // Định nghĩa thứ tự tham số cho từng hàm action
      const actionParamOrderMap: Record<string, string[]> = {
        rotate: ["axisPoint","angle"],
        draw: ["color"],
        move: ["x", "y", "duration"],
        // Thêm các action khác tại đây nếu cần
      };
  
      const paramOrderExpected = actionParamOrderMap[functionName];
  
      if (!paramOrderExpected) {
        console.warn(
          `⚠️ No parameter order defined for function '${functionName}', passing raw data.`
        );
        return fn.call(target, data); // fallback nếu không có định nghĩa thứ tự
      }
  
      // Chuyển data object thành mảng args theo thứ tự định nghĩa
      const args: any[] = [];
  
      for (const key of paramOrderExpected) {
        if (!(key in data)) {
          throw new Error(
            `Missing parameter '${key}' for function '${functionName}'`
          );
        }
        args.push(data[key]);
      }
  
      if (args.length !== paramCount) {
        console.warn(
          `⚠️ Function '${functionName}' expects ${paramCount} args, but got ${args.length}.`
        );
      }
  
      return fn.apply(target, args);
    }
  }
  