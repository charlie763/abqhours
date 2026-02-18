# Compatibility shim for Ruby 4.0+ where taint tracking was removed.
# Liquid 4.x used by Jekyll 3.9 calls tainted? which no longer exists.
if !Object.method_defined?(:tainted?)
  class Object
    def tainted?
      false
    end
  end
end
